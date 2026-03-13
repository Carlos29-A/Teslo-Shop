"use server";

import { Category } from "@/interfaces";
import { prisma } from "@/lib/prisma";


interface PaginationsOptions {
    page?: number;
    take?: number;
    gender?: Category;
}


export const getPaginationProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationsOptions) => {
    if( isNaN(Number(page))) page = 1;
    if( page < 1) page = 1;


    try {
        // 1.- Obtener el total de productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page -1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },
            where : {
                gender: gender,
            }
        });
        // 2.- total de páginas
        const totalCount = await prisma.product.count({
            where: {
                gender: gender,
            }
        });
        const totalPages = Math.ceil(totalCount / take);


        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( image => image.url),
            }))
        }       
        
    }catch(error) {
        throw new Error("Error al obtener los productos");
    }
}