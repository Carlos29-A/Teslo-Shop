"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getStock();
    },[])

    const getStock = async () => {
        const stock = await getStockBySlug(slug);
        setStock(stock);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <div className="w-24 h-7 bg-gray-200 rounded-md animate-pulse" />
        );
    }

    return (
        <h1 className={ `${titleFont.className} antialiased font-bold text-xl`}>
            Stock: { stock }
        </h1>
    )
}
