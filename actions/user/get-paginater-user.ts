"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";



export const getPaginaterUser = async () => {
    
    const session = await auth();

    if( session?.user.role !== 'admin'){
        return {
            ok: false,
            message: "No tienes permisos para acceder a esta página",
        }
    }

    
    
    const users = await prisma.user.findMany({
        orderBy: {
            name: 'desc',
        }
    });
    return {
        ok: true,
        users: users,
    }
}