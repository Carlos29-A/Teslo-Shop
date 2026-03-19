"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


export const getOrderById = async (id: string) => {

    const session = await auth();

    if(!session?.user) {
        return {
            ok: false,
            message: "No hay usuario autenticado",
        }
    }


    try {

        const order = await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })

        if( !order ) {
            return {
                ok: false,
                message: "Orden no encontrada",
            }
        }

        // Validar si el usuario es el propietario de la orden
        if(session.user.role === 'user' ){
            if(session.user.id !== order.userId) {
                return {
                    ok: false,
                    message: "No tienes permisos para acceder a esta orden",
                }
            }
        }

        return {
            ok: true,
            order: order,
        }



    }catch(error) {
        return {
            ok: false,
            message: "Error al obtener la orden",
        }
    }
}