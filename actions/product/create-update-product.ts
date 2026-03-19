"use server";

import { Product, Size } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { z } from "zod";


const productSchema = z.object({
    id: z.string().uuid().nullable().optional(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.enum(['men', 'women', 'kid', 'unisex']),

});


export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {

        console.log( productParsed.error)

        return {
            ok: false,

        }
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product;

    const prismatx = await prisma.$transaction(async (tx) => {

        let product: Product;
        const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

        if ( id ) {
            // Actualizar el producto
            product = await prisma.product.update({
                where: {
                    id: id,
                },
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[],
                    },
                    tags: {
                        set: rest.tags.split(','),
                    },
                }
            })

        
        }else{
            // Crear el producto
            product = await prisma.product.create({
                data: {
                    ...rest,
                    sizes: {
                        set: rest.sizes as Size[],
                    },
                    tags: {
                        set: tagsArray,
                    },
                }
            })

        }
        console.log(product);

        return {
            product,
        }
    })


    //TODO: revalidatePaths




    return {
        ok: true,
        message: "Producto creado correctamente",
    }
}