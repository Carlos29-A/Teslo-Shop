"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


export const getPaginatedOrders = async () => {


    const session = await auth();

    if( session?.user.role !== 'admin'){
        return {
            ok: false,
            message: "No tienes permisos para acceder a esta página",
        }
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc',
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