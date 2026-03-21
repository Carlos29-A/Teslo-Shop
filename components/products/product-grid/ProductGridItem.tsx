"use client";

import { ProductImage } from "@/components";
import { Product } from "@/interfaces"
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [ displayImage, setDisplayImage ] = useState(product.images[0]);


    const hasSecondImage = product.images.length > 1;

    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link
                href={`/product/${product.slug}`}
                className="block relative aspect-square overflow-hidden"
                onMouseEnter={() => hasSecondImage && setDisplayImage(product.images[1])}
                onMouseLeave={() => setDisplayImage(product.images[0])}
            >
                <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    className={`absolute inset-0 w-full h-full object-cover rounded transition-opacity duration-500 ease-in-out ${displayImage === product.images[0] ? "opacity-100" : "opacity-0"}`}
                    width={500}
                    height={500}
                />
                {hasSecondImage && (
                    <ProductImage
                        src={product.images[1]}
                        alt={product.title}
                        className={`absolute inset-0 w-full h-full object-cover rounded transition-opacity duration-500 ease-in-out ${displayImage === product.images[1] ? "opacity-100" : "opacity-0"}`}
                        width={500}
                        height={500}
                    />
                )}
            </Link>
            <div className="p-4 flex flex-col">
                <Link
                    className="hover:text-blue-400 transition-all"
                    href={`/product/${product.slug}`}
                >   
                    { product.title }
                </Link>
                <span className="font-bold ">{ currencyFormat(product.price) }</span>
            </div>
        </div>
    )
}
