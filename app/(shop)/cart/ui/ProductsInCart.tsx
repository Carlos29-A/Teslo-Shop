"use client"

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export const ProductsInCart = () => {
    const productsInCart = useCartStore(state => state.cart);
    const [loading, setLoading] = useState(false);
    const updateCartQuantity = useCartStore(state => state.updateCartQuantity);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

    useEffect(() => {
        setLoading(true);
    },[])


    if(!loading) return <div>Cargando...</div>;

    return (
        <>
            { /* Items */}
                {
                productsInCart.map(product => (
                    <div key={ `${product.slug}-${product.sizes}` } className="flex flex-col">
                        <div className=" flex items-center ">
                            <Image
                            src= { `/products/${product.image}`}
                            width={ 100 }
                            height={ 100 }
                            style={{
                                width: "100px",
                                height: "100px",
                            }}
                            alt={ product.title}
                            className="mr-5 rounded"
                            />
                            <div>
                                <Link href={ `/product/${product.slug}` } className="hover:text-blue-400 transition-all hover:underline ">
                                   { product.sizes } - { product.title }
                                </Link>
                                <p>{ currencyFormat(product.price) }</p>
                                <QuantitySelector 
                                    quantity={ product.quantity } 
                                    onQuantityChange={(quantity) => updateCartQuantity(product, quantity)}    
                                />
                                <button
                                    className="hover:underline transition-all duration-300 ease-out mt-3 cursor-pointer"
                                    onClick={() => removeProductFromCart(product)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    { /* Separador */}
                    <div className="w-full border-b border-gray-300 h-px my-3" />
                    
                    </div>
                ))
                }
        </>
  )
}

