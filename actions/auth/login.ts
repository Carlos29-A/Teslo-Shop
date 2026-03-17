"use server";

import { signIn } from "@/auth";


export const loginUser = async (email: string, password: string) => {
    try {
    
        await signIn("credentials", {
            email: email.toLowerCase(),
            password: password,
        })

        return {
            ok: true,
            message: "Inicio de sesión exitoso",
        }


    }catch(error) {
        return {
            ok: false,
            message: "Error al iniciar sesión",
        }
    }
}