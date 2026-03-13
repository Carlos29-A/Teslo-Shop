// cada minuto se actualiza la página
export const revalidate = 60;

import { getPaginationProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: Promise<{ page?: string; take?: string }>;
}



export default async function Home( { searchParams }: Props ) {

  const { page, take } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({ page: pageNumber});
  
  if( products.length === 0 ) {
    redirect("/");
  }
  
  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Encuentra los mejores productos para ti"
      />

      <ProductGrid 
        products={ products }
      />
      <Pagination totalPages={ totalPages } />
    </>
  );
}
