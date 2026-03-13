"use server";

import { prisma } from "@/lib/prisma";


export const getStockBySlug = async (slug: string) => {

    try {

        const stock = await prisma.product.findUnique({
            where: {
                slug: slug,
            }
        })
        if( !stock ) return null;

        return stock.inStock;

    }catch ( error ) {
        throw new Error("Error al obtener el stock del producto");
    }
}