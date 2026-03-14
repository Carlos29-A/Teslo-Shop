import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { Title } from "@/components";
import { OrdenSummary } from "../product/[slug]/ui/OrdenSummary";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title 
          title="Carrito"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          { /* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl"> Agregar más items</span>
            <Link
              href="/"
              className="underline mb-5"
            >
              Continuar comprando
            </Link>
            <ProductsInCart/>
          </div>
          


          { /* Checkout - Resumen de la orden */}
          <OrdenSummary />

            <div className="mt-5 mb-2 w-full">
              <Link href={"/checkout/address"} className="flex btn-primary hover:bg-blue-800 cursor-pointer justify-center ">
                Continuar con la compra
              </Link>
            </div>

          </div>

        </div>
      </div>
  )
}
