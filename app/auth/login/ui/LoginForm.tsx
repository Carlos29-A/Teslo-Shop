"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { IoAlertCircle } from "react-icons/io5"

export const LoginForm = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const credentialAction = (formData: FormData) => {

        if( !formData.get("email") || !formData.get("password") ) {
            setErrorMessage("Todos los campos son requeridos");
            return;
        }
        setErrorMessage(null);
        setIsLoading(true);
        
        signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
        })
    }

    return (
        <form className="flex flex-col" action={ credentialAction } noValidate>

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border border-gray-200 bg-gray-200 rounded mb-5"
                type="email" name="email"/>
            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border border-gray-200 bg-gray-200 rounded mb-5"
                type="password" name="password"/>

            {
                errorMessage && (
                    <>
                    <div className="flex gap-2 items-center">
                        <IoAlertCircle className="w-6 h-6 text-red-500 mb-2" />
                        <p className="text-red-500 text-sm fade-in mb-2">
                            { errorMessage }
                        </p>
                    </div>
                    </>
                )
            }
            <button
                className="btn-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
            >
                { isLoading ? "Ingresando..." : "Ingresar" }
            </button>


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/register" 
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}
