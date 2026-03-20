"use server";

import { Product, Size } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');


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


    try {

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
            // Proceso de cargar y guardar las imagenes
            // Recorrer las imagenes y guardarlas

            if(formData.get('images')){

                // [https://url.com, https://url.com, https://url.com]
                const images = await uploadImages(formData.getAll('images') as File[]);
                
                if(!images) {
                    throw new Error('Error al subir las imagenes, rollingback');
                }

                await prisma.productImages.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id,
                    }))
                })

            }

    
            return {
                product,
            }
        })


        //TODO: Revalidar los paths

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);


        return {
            ok: true,
            product: prismatx.product,

        }


    } catch (error) {
        return {
            ok: false,
            message: "Revisar los logs del servidor, no se pudo crear/actualizar el producto",
        }
    }

}



const uploadImages = async ( images: File[]) => {

    try {

        const uploadPromises = images.map( async (image) => {

            try{

                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');


                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then( result => result.secure_url);
            
            }catch(error){
                console.log(error);
                return null;
            }            
        })

        const uploadedImages = await Promise.all(uploadPromises);

        return uploadedImages;


    }catch(error){
        console.log(error);
        return null;
    }

}