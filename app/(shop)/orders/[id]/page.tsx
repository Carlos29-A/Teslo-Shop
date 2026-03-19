import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface Props {
  params: Promise<{ id: string }>
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]


export default async function OrdersPageForId({ params }: Props) {
  const { id } = await params;
  
  //Todo: verificar
  const { ok, order, message } = await getOrderById(id);

  if(!ok) {
    return redirect('/')
  }
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title 
          title={ `Orden #${ id }` }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          { /* Carrito */}
          <div className="flex flex-col mt-5">
            
            <div className={
              clsx( 
                "flex items-center rounded-lg py-2 px-3.5 text.xs font.bold text-white mb-5",
                {
                  "bg-red-600": !order?.isPaid,
                  "bg-green-600": order?.isPaid,
                }
              )
            }>
              <IoCartOutline size= { 30} />
              {/* <span className="mx-2"> Pendiente de pago</span> */}
              <span className="mx-2">
                {
                  order?.isPaid ? 'Pagada' : 'Pendiente de pago'
                }
              </span>
            </div>
            
            
            
            { /* Items */}
            {
              order?.OrderItem.map(product => (
                <div key={ product.product.slug } className="flex flex-col">
                  <div className=" flex items-center ">
                    <Image
                      src= { `/products/${product.product.ProductImage[0].url}`}
                      width={ 100 }
                      height={ 100 }
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                      alt={ product.product.title}
                      className="mr-5 rounded"
                    />
                    <div>
                      <p>{ product.product.title }</p>
                      <p> { currencyFormat(product.price) } x { product.quantity }</p>
                      <p className="font-bold">Subtotal { currencyFormat(product.price * product.quantity) } </p>
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
              <p className="text-xl">{ order?.OrderAddress?.name } { order?.OrderAddress?.lastName }</p>
              <p>{ order?.OrderAddress?.address }</p>
              <p>{ order?.OrderAddress?.department }, { order?.OrderAddress?.province }, { order?.OrderAddress?.district }</p>
              <p>{ order?.OrderAddress?.postalCode }</p>
              <p>{ order?.OrderAddress?.phone }</p>
            </div>

            { /* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"> </div>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">

              <span>N° de Productos </span>
              <span className="text-right">{ order?.itemsInOrder } articulos</span>

              <span>Subtotal</span>
              <span className="text-right">{ currencyFormat(order?.subTotal ?? 0) }</span>

              <span>Impuesto (15%)</span>
              <span className="text-right">{ currencyFormat(order?.tax ?? 0) }</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">{ currencyFormat(order?.total ?? 0) }</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              <div className={
                clsx( 
                  "flex items-center rounded-lg py-2 px-3.5 text.xs font.bold text-white mb-5",
                  {
                    "bg-red-600": !order?.isPaid,
                    "bg-green-600": order?.isPaid,
                  }
                )
              }>
                <IoCartOutline size= { 30} />
                {/* <span className="mx-2"> Pendiente de pago</span> */}
                <span className="mx-2">
                  {
                    order?.isPaid ? 'Pagada' : 'Pendiente de pago'
                  }
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
