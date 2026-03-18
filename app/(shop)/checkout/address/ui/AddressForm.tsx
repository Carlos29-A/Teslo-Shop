"use client";

import { deletUserAddress, setUserAddress } from "@/actions";
import { Address } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AddressFormInputs {
    name: string;
    lastName: string;
    dni: string;
    phone: string;
    department: string;
    province: string;
    district: string;
    postalCode: string;
    address: string;
    reference?: string ;
    saveAddress: boolean;
}

const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho',
    'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco',
    'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima',
    'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura',
    'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali',
];


interface Props {
    userAddress?: Address;
}

export const AddressForm = ({ userAddress }: Props) => {

    const setAddress = useAddressStore(state => state.saveAddress);
    const [saveAddress, setSaveAddress] = useState(false);
    const address = useAddressStore(state => state.address);
    const router = useRouter();


    //Obtener el id del usuario autenticado, sino existe, redirigir a la página de login
    const { data: session } = useSession({
        required: true,
    });

    const { register, handleSubmit, watch, reset } = useForm<AddressFormInputs>({
        defaultValues: {
            ...userAddress,
            reference: userAddress?.reference ?? undefined,
            saveAddress: true,
        }
    })

    useEffect(() => {
        if (address.name) {
            reset(address);
        }
    }, [address, reset])

    const watchedFields = watch(['name', 'lastName', 'dni', 'phone', 'department', 'province', 'district', 'postalCode', 'address']);
    const isFormValid = watchedFields.every(field => field !== undefined && field.toString().trim() !== '');

    const onSubmit = (data: AddressFormInputs) => {
        setAddress(data);

        const { saveAddress, ...addressData } = data;

        if (saveAddress) {
            //Guardar la dirección en la base de datos
            setUserAddress(addressData, session!.user?.id as string)

        } else {
            //Eliminar la dirección de la base de datos
            deletUserAddress(session!.user?.id as string)
        }
        //Redirigir a la página de checkout
        router.push('/checkout');
    }

    return (
        <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    placeholder="Ej: Juan Carlos"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("name", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    placeholder="Ej: Pérez García"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("lastName", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>DNI / Documento de identidad</span>
                <input
                    type="text"
                    maxLength={12}
                    placeholder="Ej: 12345678"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("dni", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <div className="flex">
                    <span className="flex items-center px-3 bg-gray-300 rounded-l-md text-gray-600 text-sm">
                        +51
                    </span>
                    <input
                        type="tel"
                        maxLength={9}
                        placeholder="Ej: 987654321"
                        className="p-2  rounded-r-md bg-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("phone", { required: true })}
                    />
                </div>
            </div>

            <div className="flex flex-col mb-2">
                <span>Departamento</span>
                <select className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" {...register("department", { required: true })}>
                    <option value="">[ Seleccione ]</option>
                    {departamentos.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Provincia</span>
                <input
                    type="text"
                    placeholder="Ej: Lima"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("province", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Distrito</span>
                <input
                    type="text"
                    placeholder="Ej: Miraflores"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("district", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    maxLength={5}
                    placeholder="Ej: 15074"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("postalCode", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2 sm:col-span-2">
                <span>Dirección</span>
                <input
                    type="text"
                    placeholder="Ej: Av. Larco 345"
                    className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("address", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2 sm:col-span-2">
                <span>Referencia (opcional)</span>
                <input
                    type="text"
                    placeholder="Ej: Frente al parque, edificio azul"
                    className="p-2  rounded-md bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("reference")}
                />
                <div className="inline-flex items-center mt-5 mb-10">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                        data-ripple-dark="true"
                    >
                        <input
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            id="checkbox"
                            checked={saveAddress}
                            {...register("saveAddress")}
                            onChange={() => setSaveAddress(!saveAddress)}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>Guardar dirección</span>
                </div>
                <div className="flex flex-col mb-2 sm:mt-5">
                    <button
                        className={clsx(
                            "flex w-full sm:w-1/2 justify-center py-2 px-4 rounded-md font-semibold transition-all duration-200",
                            {
                                "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer": isFormValid,
                                "bg-gray-300 text-gray-400 cursor-not-allowed opacity-60": !isFormValid,
                            }
                        )}
                        type="submit"
                        disabled={!isFormValid}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </form>
    )
}
