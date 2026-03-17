"use client"

import { loginUser, registerUser } from "@/actions";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
    name: string;
    email: string;
    password: string;
}


export const RegisterForm = () => {
 
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { register, handleSubmit, formState: { errors} } = useForm<FormInputs>();
    // Función para manejar el envío del formulario solo se llama cuando el formulario es valido
    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        setErrorMessage('');
        const { name, email, password } = data;
        const response = await registerUser (name, email, password);

        if(!response.ok){
            setErrorMessage(response.message);
            return;
        }
        await loginUser(email.toLowerCase(), password);
        window.location.replace('/');

    } 
    return (
        <form className="flex flex-col" onSubmit={ handleSubmit(onSubmit)}>

        <label htmlFor="email">Nombre completo</label>
            <input
            className={
                clsx(
                    "px-5 py-2 border border-gray-200 bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.name
                    }
                )
            }
            type="text" { ...register("name", { required: true }) } />

            <label htmlFor="email" className="mb-2">Correo electrónico</label>
            <input
            className={
                clsx(
                    "px-5 py-2 border border-gray-200 bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.email
                    }
                )
            }
            type="email" { ...register("email", { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El correo electrónico no es válido" } }) } />


            <label htmlFor="email">Contraseña</label>
            <input
            className={
                clsx(
                    "px-5 py-2 border border-gray-200 bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.password
                    }
                )
            }
            type="password" { ...register("password", { required: true }) } />

            <span className="text-red-500 text-sm fade-in mb-2">{ errorMessage }</span>
            <button
                type="submit"
                className="btn-primary cursor-pointer">
                Crear cuenta
            </button>


            {/* divisor line */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
            href="/auth/new-account" 
            className="btn-secondary text-center">
            Ingresar
            </Link>

        </form>
    )
}
