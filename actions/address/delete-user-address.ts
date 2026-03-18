"use server";

import { prisma } from "@/lib/prisma";



export const deletUserAddress = async (userId: string) => {

    try {

        // Verificar si la dirección existe
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })
        // Si no existe, retornar error
        if (!storedAddress) {
            return {
                ok: false,
                message: "Dirección del usuario no encontrada",
            }
        }
        // Si existe, eliminar la dirección
        await prisma.userAddress.delete({
            where: {
                userId
            }
        })

        return {
            ok: true,
            message: "Dirección del usuario eliminada correctamente",
        }


    }catch(error) {
        return {
            ok: false,
            message: "Error al eliminar la dirección del usuario",
        }
    }
}