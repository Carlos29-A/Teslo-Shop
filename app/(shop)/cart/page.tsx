import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]


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
            { /* Items */}
            {
              productsInCart.map(product => (
                <div key={ product.slug } className="flex flex-col">
                  <div className=" flex items-center ">
                    <Image
                      src= { `/products/${product.images[0]}`}
                      width={ 100 }
                      height={ 100 }
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                      alt={ product.title}
                      className="mr-5 rounded"
                    />
                    <div>
                      <p>{ product.title }</p>
                      <p>{ product.price }</p>
                      <QuantitySelector quantity={ 3 } />
                      <button
                        className="hover:underline transition-all duration-300 ease-out mt-3 cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  { /* Separador */}
                  <div className="w-full border-b border-gray-300 h-px my-3" />
                  
                </div>
              ))
            }
          </div>
          


          { /* Checkout - Resumen de la orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">

              <span>N° de Productos </span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">S/. 100</span>

              <span>Impuesto (15%)</span>
              <span className="text-right">S/. 15</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">S/. 115</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href={"/checkout/address"} className="flex btn-primary hover:bg-blue-800 cursor-pointer justify-center ">
                Continuar con la compra
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
