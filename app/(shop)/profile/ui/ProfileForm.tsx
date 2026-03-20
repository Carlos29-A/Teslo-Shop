"use client";

import { updateProfileUser } from "@/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "nextjs-toast-notify";

interface Props {
  imageUrl?: string | null;
  name?: string;
  email?: string;
}

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const ProfileForm = ({ imageUrl, name = "", email = "" }: Props) => {
    const profileImage = imageUrl || "/imgs/placeholder.jpg";

    const router = useRouter();
    const { update: updateSession } = useSession();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            name,
            email,
            password: "",
        }
    })

    const displayName = watch("name");

    useEffect(() => {
        reset({ name, email, password: "" });
    }, [name, email, imageUrl, reset]);

    const onSubmit = async (data: FormInputs) => {

        const { name, email, password } = data;

        const response = await updateProfileUser(
            name,
            email,
            undefined,
            password.trim() ? password : undefined
        );

        if(!response.ok){
            alert(response.message);
            return;
        }
        // Actualizar la sesión
        await updateSession();
        router.refresh();
        // Mostrar mensaje de éxito

        showToast.success(response.message, {
            duration: 4000,
            progress: true,
            position: "top-center",
            transition: "bounceIn",
            icon: '',
            sound: true,
        });
    }

    return (
        <form className="w-full max-w-5xl p-2 sm:p-4" onSubmit={ handleSubmit(onSubmit) } noValidate>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr]">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-gray-200/80 shadow-md">
                        <Image
                        src={profileImage}
                        alt="Foto de perfil"
                        fill
                        className="object-cover"
                        sizes="208px"
                        />
                    </div>

                    <button
                        type="button"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
                    >
                        Cambiar foto
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{displayName || "Tu nombre"}</h2>
                        <p className="mt-1 text-sm text-gray-500">Actualiza tu informacion personal y foto de perfil</p>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[140px_1fr]">
                        <label htmlFor="name" className="text-sm font-medium text-gray-600">
                        Nombre
                        </label>
                        <input
                        id="name"
                        type="text"
                        { ...register("name", { required: true }) }
                        className="w-full rounded-md border border-gray-300 bg-transparent p-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200/60"
                        />
                    </div>

                    <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[140px_1fr]">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600">
                        Email
                        </label>
                        <input
                        id="email"
                        type="email"
                        { ...register("email", { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "El correo electrónico no es válido" } }) }
                        className="w-full rounded-md border border-gray-300 bg-transparent p-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200/60"
                        />
                    </div>

                    <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[140px_1fr]">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600">
                        Contraseña
                        </label>
                        <input
                        id="password"
                        { ...register("password", {
                            maxLength: 100,
                            validate: (v) =>
                                !v || v.length >= 6 || "La contraseña debe tener al menos 6 caracteres",
                        }) }
                        type="password"
                        placeholder="Nueva contraseña"
                        className="w-full rounded-md border border-gray-300 bg-transparent p-2.5 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200/60"
                        />
                    </div>

                    <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                        <button type="submit" className="btn-primary sm:w-auto">
                        Guardar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
