"use server";

import { prisma } from "@/lib/prisma";


export const getCategories = async () => {

    try {

        const categories = await prisma.category.findMany();

        return {
            ok: true,
            categories: categories,
        }

    }catch(error) {
        return {
            ok: false,
            message: "Error al obtener las categorías",
        }
    }
}