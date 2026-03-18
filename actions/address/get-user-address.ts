"use server";

import { prisma } from "@/lib/prisma";


export const getUserAddrss = async (userId: string) => {


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
        const { userId: _, ...address } = storedAddress;
        // Si existe, retornar la dirección
        return address;
    }catch(error) {
        return {
            ok: false,
            message: "Error al obtener la dirección del usuario",
        }
    }
}