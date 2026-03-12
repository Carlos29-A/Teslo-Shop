import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: Promise<{ id: Category }>
}

const Traductions = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex',
}

export default async function CategoryPageForId({ params }: Props) {
  
  const { id } = await params;
  
  //Filter products by category
  const productsByCategory = initialData.products.filter(product => product.gender === id);


  return (
    <>
      <Title
        title={ `Productos para ${ Traductions[id as keyof typeof Traductions] }` }
        subtitle={ `Encuentra los mejores productos para ${ Traductions[id as keyof typeof Traductions] }` }
      />
      <ProductGrid
        products={ productsByCategory }
      />
    </>
  )
}
