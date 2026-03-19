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
        if (!storedAddress) return null;

        const { userId: _, id: __, ...address } = storedAddress;
        return address;

    }catch(error) {
        console.error(error);
        return null;
    }
}