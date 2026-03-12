import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title 
          title="Verificar Orden"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          { /* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl"> Ajustar elementos</span>
            <Link
              href="/cart" 
              className="underline mb-5"
            >
              Editar Carrito
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
                      <p> S/. { product.price } x 3</p>
                      <p className="font-bold">Subtotal S/.{ product.price * 3  } </p>
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
          <div className="bg-white rounded-xl shadow-xl p-7 ">

            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            
            <div className="mb-10">
              <p className="text-xl">Carlos Aguilar Villanueva</p>
              <p>Franciso de Miranda #1371</p>
              <p>Trujillo, La Libertad</p>
              <p>987654321</p>
            </div>

            { /* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"> </div>

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
              <Link href={"/orders/123"} className="flex btn-primary hover:bg-blue-800 cursor-pointer justify-center ">
                Colocar orden
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
