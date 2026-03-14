"use client";

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";


interface Props {
    product: Product;
}

export const AddToCart = ( { product }: Props ) => {
    
    const addProductToCart = useCartStore( state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);


    const addToCart = () => {
        setError(true);
        
        if( !size ) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            sizes: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct);

        // Resetear el formulario
        setError(false);
        setQuantity(1);
        setSize(undefined);
        
    }
    
    return (
        <>
        {
            error && !size && (
                <span className="mt-2 text-red-500 text-sm fade-in">
                    Debes seleccionar una talla y una cantidad
                </span>
            )
        }

        { /* Selector de tallas */}
            <SizeSelector
                selectedSize={ size }
                availableSizes={ product.sizes }
                onSizeChange={ setSize }
            />

            { /* Selector de cantidad */}
            <QuantitySelector
                quantity={ quantity }
                onQuantityChange={ setQuantity }
            />

            { /* Button */}
            <button className="my-5 btn-primary cursor-pointer" onClick={ addToCart }>
            Agregar al carrito
            </button>
        </>
    )
}
