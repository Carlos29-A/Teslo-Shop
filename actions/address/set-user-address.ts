"use server";

import { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";


export const setUserAddress = async ( address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            message: "Dirección del usuario establecida correctamente",
            address: newAddress,
        }

    }catch(error) {
        return {
            ok: false,
            message: "Error al establecer la dirección del usuario",
        }
    }
}

const createOrReplaceAddress = async ( address: Address, userId: string) => {

    try {

        //Verificar si la dirección ya existe
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId,
            }
        })

        //Si no existe, crear la dirección
        if(!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...address,
                    userId
                }
            })
            return newAddress;
        }

        //Actualizar la dirección
        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId: userId,
            },
            data: address,
        })

        return updatedAddress;


    }catch(error) {
        console.error(error);
        throw new Error("Error al crear o reemplazar la dirección del usuario");
    }
}