"use server";

import { prisma } from "@/lib/prisma";


interface PaginationsOptions {
    page?: number;
    take?: number;
    /** Nombre de la categoría en BD (ej. Shirts, Pants, Hoodies, Hats) */
    categoryName?: string;
    /** Texto de búsqueda (título, slug, descripción, nombre de categoría) */
    query?: string;
}


export const getPaginationProductsWithImages = async ({ page = 1, take = 12, categoryName, query }: PaginationsOptions) => {
    if( isNaN(Number(page))) page = 1;
    if( page < 1) page = 1;

    const q = query?.trim() ?? "";
    const cat = categoryName?.trim() ?? "";

    const where = {
        ...(cat
            ? {
                  category: {
                      name: { equals: cat, mode: "insensitive" as const },
                  },
              }
            : {}),
        ...(q
            ? {
                  OR: [
                      { title: { contains: q, mode: "insensitive" as const } },
                      { slug: { contains: q, mode: "insensitive" as const } },
                      { description: { contains: q, mode: "insensitive" as const } },
                      {
                          category: {
                              name: { contains: q, mode: "insensitive" as const },
                          },
                      },
                  ],
              }
            : {}),
    };

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
            where,
        });
        // 2.- total de páginas
        const totalCount = await prisma.product.count({
            where,
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
