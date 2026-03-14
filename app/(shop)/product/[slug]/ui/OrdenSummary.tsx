"use client"

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const OrdenSummary = () => {

    const totalItems = useCartStore(state => state.getTotalItems());
    const subTotal = useCartStore(state => state.subTotal());
    const tax = useCartStore(state => state.tax());
    const total = useCartStore(state => state.total());
    const [loading, setLoading] = useState(false);

    if(totalItems === 0) redirect("/empty");

    useEffect(() => {
        setLoading(true);
    },[])

    if(!loading) return <div>Cargando...</div>;
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2">Resumen de orden</h2>
                <div className="grid grid-cols-2">

                <span>N° de Productos </span>
                <span className="text-right">{ totalItems } articulos</span>

                <span>Subtotal</span>
                <span className="text-right">{ currencyFormat(subTotal) }</span>

                <span>Impuesto (15%)</span>
                <span className="text-right">{ currencyFormat(tax) }</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>

                </div>
            </div>
        </>
    )
}
