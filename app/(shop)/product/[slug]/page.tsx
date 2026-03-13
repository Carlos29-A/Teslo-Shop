export const revalidate = 604800;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>
}

// generate Metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "Producto no encontrado",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "Producto no encontrado",
      images: [`/products/${product?.images[1]}`],
    },
  }
}



export default async function ProductPageForSlug({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if ( !product ) {
    notFound();
  }

  return (
    <div 
      className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 "
    >
      { /* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        { /* Mobile Slideshow */}
        <ProductMobileSlideShow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        { /* Desktop */}
        <ProductSlideShow
          images={ product.images }
          title={ product.title }
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        
        <StockLabel 
          slug={ product.slug }
        />
        <h1 className={ `${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg mb-5 ">
          S/.{ product.price}
        </p>

         { /* Selector de tallas */}
        <SizeSelector
          selectedSize={ product.sizes[0] }
          availableSizes={ product.sizes }
        />

         { /* Selector de cantidad */}
        <QuantitySelector
          quantity={ 2 }
        />

         { /* Button */}
         <button className="my-5 btn-primary cursor-pointer">
          Agregar al carrito
         </button>
         { /* Descripcion */}
         <h3 className="font-bold text-sm ">Descripción</h3>
         <p className="font-light">
          { product.description}
         </p>
      </div>
    </div>
  )
}
