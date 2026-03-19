"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const changeUserRole = async (userId: string, role: 'admin' | 'user') => {
    const session = await auth();

    if( session?.user.role !== 'admin'){
        return {
            ok: false,
            message: "No tienes permisos para acceder a esta página",
        }
    }

    try {


        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: role ,
            },
        })


        revalidatePath('/admin/users');
        
        return {
            ok: true,
            message: "Rol del usuario cambiado correctamente",
        }

    }catch(error) {
        return {
            ok: false,
            message: "Error al cambiar el rol del usuario",
        }
    }

}