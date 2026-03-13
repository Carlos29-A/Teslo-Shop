export const revalidate = 60; // 1 hour

import { getPaginationProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

interface Props {
  params: Promise<{ gender: Category }>
}

const Traductions = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex',
}

export default async function CategoryPageForId({ params }: Props) {
  
  const { gender } = await params;
  
  //Filter products by category
  const { products, totalPages } = await getPaginationProductsWithImages({ gender });


  return (
    <>
      <Title
        title={ `Productos para ${ Traductions[gender as keyof typeof Traductions] }` }
        subtitle={ `Encuentra los mejores productos para ${ Traductions[gender as keyof typeof Traductions] }` }
      />
      <ProductGrid
        products={ products }
      />
      <Pagination 
        totalPages={ totalPages }
      />
    </>
  )
}
