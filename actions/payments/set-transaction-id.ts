"use server";

import { prisma } from "@/lib/prisma";

export const setTransactionId = async ( transactionId: string, orderId: string ) => {
    try {

        const order = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                transactionId: transactionId,
            }
        })
        if(!order) {
            return {
                ok: false,
                message: "Orden no encontrada",
            }
        }

        return {
            ok: true,
            message: "Transacción guardada en la base de datos",
        }


    }catch(error) {
        return {
            ok: false,
            message: "Error al guardar la transacción en la base de datos",
        }
    }
}