"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";


export const updateProfileUser = async (name: string, email: string, image?: string, password?: string) => {
    
    const session = await auth();

    if(!session?.user) {
        return {
            ok: false,
            message: "No hay usuario autenticado",
        }
    }
    
    try {
        
        // Buscar el usuario
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            }
        })

        if(!user) {
            return {
                ok: false,
                message: "Usuario no encontrado",
            }
        }
        
        // Actualizar el usuario
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
                email,
                image: image ? image : user.image,
                password: password ? bcrypt.hashSync(password) : user.password,
            }
        })

        revalidatePath('/profile');

        return {
            ok: true,
            message: "Perfil actualizado correctamente",
        }



    } catch (error) {
        return {
            ok: false,
            message: "Error al actualizar el perfil del usuario",
        }
    }
}