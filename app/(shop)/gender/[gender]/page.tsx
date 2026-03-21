export const revalidate = 60; // 1 hour

import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ gender: Category }>;
  searchParams: Promise<{ page?: string }>;
}

const Traductions = {
  men: 'Hombres',
  women: 'Mujeres',
  kid: 'Niños',
  unisex: 'Unisex',
}

const TAKE = 12;

export default async function CategoryPageForId({ params, searchParams }: Props) {
  
  const { gender } = await params;
  const { page } = await searchParams;
  let pageNumber = page ? parseInt(page, 10) : 1;
  if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;

  const genderFilter = gender;

  const [productsRaw, totalCount] = await Promise.all([
    prisma.product.findMany({
      take: TAKE,
      skip: (pageNumber - 1) * TAKE,
      where: { gender: genderFilter },
      include: {
        ProductImage: {
          take: 2,
          select: { url: true },
        },
      },
    }),
    prisma.product.count({ where: { gender: genderFilter } }),
  ]);

  const products = productsRaw.map((product) => ({
    ...product,
    images: product.ProductImage.map((image) => image.url),
  }));

  const totalPages = Math.ceil(totalCount / TAKE);

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
