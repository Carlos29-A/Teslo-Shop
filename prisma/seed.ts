import { prisma } from '@/lib/prisma';
import { initialData } from '../seed/seed';

async function main() {

  if (process.env.NODE_ENV === 'production') return;

  // 1.- Borrar registros previos
  //await Promise.all([
  await prisma.orderAddress.deleteMany(),
  await prisma.orderItem.deleteMany(),
  await prisma.order.deleteMany(),
  await prisma.user.deleteMany(),
  await prisma.productImages.deleteMany(),
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  //])

  const { categories, products, users } = initialData;
  
  // Usuarios
  await prisma.user.createMany({
    data: users
  });
  
  
  // Categorias
  const categoriesData = categories.map((name) => ({ name }))

  await prisma.category.createMany({
    data: categoriesData
  })

  // Productos

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  } , {} as Record<string, string>)

  products.forEach( async product => {

    const { images, type, ...rest} = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    //Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImages.createMany({
      data: imagesData
    })
  });
  



  console.log('Seed ejecutado correctamente');
}

main();
