"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


export const getOrdersByUser = async () => {


    const session = await auth();

    if(!session?.user){
        return {
            ok: false,
            message: "No hay usuario autenticado",
        }
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            OrderAddress: {
                select: {
                    name: true,
                    lastName: true,
                }
            }
        }
    })

    return {
        ok: true,
        orders: orders,
    }
}