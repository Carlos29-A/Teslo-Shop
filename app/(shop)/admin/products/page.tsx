export const revalidate = 0;

import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';

import Link from 'next/link';
import { IoAddOutline, IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: Promise<{ page?: string; take?: string }>;
}

export default async function ProductsAdminPage( { searchParams }: Props ) {
  
  
  const { page, take } = await searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  const { products, currentPage, totalPages } = await getPaginationProductsWithImages({ page: pageNumber});
  
  
  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className='flex justify-end mb-5'>
        <Link 
          href={'/admin/product/new'}
          className='bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-all duration-300'
        >
          <IoAddOutline className="text-2xl" />
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 ">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Género
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>


            {
              products.map(product => (
                <tr 
                  key={product.id} 
                  className="bg-white border-b-2  border-b-gray-200 transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.ProductImage[0].url}`}
                        alt={product.title}
                        width={100}
                        height={100}
                        className='w-20 h-20 object-cover rounded-md'
                      >                      
                      </Image>
                    </Link>
                    
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className='hover:underline'
                    >
                      {product.title}
                    </Link>
                    
                  </td>
                  <td className="text-sm text-gray-900  px-6 py-4 whitespace-nowrap font-bold">
                    {currencyFormat(product.price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(', ')}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagination 
          totalPages={ totalPages }
        />
      </div>
    </>
  );
}