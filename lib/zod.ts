import { z } from "zod"

export const singInSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(6, { message: "Contraseña inválida" }),
})