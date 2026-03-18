"use server";

import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}



export const placeOrder = async ( productsIds: ProductToOrder[], address: Address) => {
    try {

        // Obtener el usuario desde el servidor
        const session = await auth();
        const userId = session?.user?.id;
        
        if(!userId) {
            return {
                ok: false,
                message: "No hay usuario autenticado",
            }
        }
        
        // Obtener la información de los productos
        // Nota: recuerden que se puede llevar 2+ productos con el mismo ID
        const products = await prisma.product.findMany({
            where: {
                id : {
                    // Regresa un array de ids ejemplo: ['1', '2', '3']
                    in : productsIds.map(product => product.productId)
                }
            }
        })

        // Calcular los montos // Encabezados
        const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity ,0)
        // Calcular el subtotal, total, tax
        const { subtotal, tax, total } = productsIds.reduce((totals, item) => {

            const productQuantity = item.quantity;
            const product = products.find(product => product.id === item.productId)

            if(!product) throw new Error("Producto no encontrado - 500");

            const subtotal = product.price * productQuantity;
            totals.subtotal += subtotal;
            totals.tax += subtotal * 0.15;
            totals.total = totals.subtotal + totals.tax;

            return totals;
        },{ subtotal: 0, tax: 0, total: 0 })


        try {
            // Crear la transacción de base de  datos
            const prismaTx = await prisma.$transaction( async (tx) => {
                
                // 1.- Actualizar el stock de los productos
                const updatedProductsPromises = products.map( async (product) => {

                    // Accumular los valores
                    const productQuantity = productsIds.filter(p => p.productId === product.id).reduce((acc, p) => acc + p.quantity,0)

                    if (productQuantity === 0) {
                        throw new Error(`No hay stock disponible para el producto ${product.title} - 400`); 
                    }

                    return tx.product.update({
                        where: {
                            id: product.id,
                        },
                        data:{
                            inStock: {
                                decrement: productQuantity
                            }
                        }
                    })

                });

                const updatedProducts = await Promise.all(updatedProductsPromises);

                // Verificar valores negativos en las existencias = no hay stock

                updatedProducts.forEach( product => {
                    if (product.inStock < 0) {
                        throw new Error(`No hay stock disponible para el producto ${product.title} - 400`);
                    }
                })


                // 2.-  Crear la orden - Encabezado - Detalle
                const order = await tx.order.create({
                    data: {
                        userId: userId,
                        itemsInOrder: itemsInOrder,
                        subTotal: subtotal,
                        tax: tax,
                        total: total,
                        OrderItem: {
                            createMany: {
                                data: productsIds.map(product => ({
                                    quantity: product.quantity,
                                    size: product.size,
                                    productId: product.productId,
                                    price: products.find(p => p.id === product.productId)?.price || 0
                                }))
                            }
                        }
                    },
                    include: {
                        OrderItem: true,
                    }
                })

                // Validar, si el price es cero de un producto, entonces lanzar un error
                const orderItems = order.OrderItem;
                const orderItemsWithZeroPrice = orderItems.filter(item => item.price === 0);
                if(orderItemsWithZeroPrice.length > 0) throw new Error("El precio de un producto es cero - 400");

                // 3.- Crear la dirección de la orden
                const orderAddress = await tx.orderAddress.create({
                    data: {
                        ...address,
                        orderId: order.id,
                    }
                })
                
            
            
                return {
                    orden: order,
                    updatedProducts: updatedProducts,
                    orderAddress: orderAddress,
                }
            });

            return {
                ok: true,
                order: prismaTx.orden,
                prismaTx: prismaTx
            }
        }catch(error : any) {
            return {
                ok: false,
                message: error.message,
            }
        }

    }catch(error) {
        return {
            ok: false,
            message: "Error al colocar la orden",
        }
    }
} 
