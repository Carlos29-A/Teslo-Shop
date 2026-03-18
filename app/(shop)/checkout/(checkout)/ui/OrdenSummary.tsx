"use client"

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react"

export const OrdenSummary = () => {
  
    const [loading, setLoading] = useState(false);
    
    /*Traer los datos de la dirección de entrega*/
    const address = useAddressStore(state => state.address);
    // Traer los datos del carrito osea el total de items, subtotal, tax, total
    const totalItems = useCartStore(state => state.getTotalItems());
    const subTotal = useCartStore(state => state.subTotal());
    const tax = useCartStore(state => state.tax());
    const total = useCartStore(state => state.total());


    useEffect(() => {
        setLoading(true);
    },[])

    if(!loading) return <div>Cargando...</div>;
  
  
    return (
        <div className="bg-white rounded-xl shadow-xl p-7 ">

            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            
            <div className="mb-10">
              <p className="text-xl">{ address.name } { address.lastName }</p>
              <p>{ address.address }</p>
              <p>{ address.department }, { address.province }, { address.district }</p>
              <p>{ address.postalCode }</p>
              <p>{ address.phone }</p>
              <p>{ address.reference }</p>
            </div>

            { /* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"> </div>

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
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

            <div className="mt-5 mb-2 w-full">
              {/* TODO: href a la página de ordenes*/}
              <button  className="flex btn-primary hover:bg-blue-800 cursor-pointer justify-center ">
                Colocar orden
              </button>
            </div>

        </div>
    )
}
