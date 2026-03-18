"use client"


import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";


export const ProductsInCart = () => {
    const productsInCart = useCartStore(state => state.cart);
    const [loading, setLoading] = useState(false);


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
                                <span className="text-lg font-bold">
                                   { product.sizes } - { product.title } ( { product.quantity } )
                                </span>
                                <p>{ currencyFormat(product.price) }</p>
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

