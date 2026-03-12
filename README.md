# Teslo-Shop
Es una tienda online llamada Teslo Shop, hecha con Next.js + TypeScript + Tailwind, que muestra productos con animaciones suaves (menú, grid y tarjetas de producto con cambio de imagen al hacer hover).


## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias  ```npm install```
4. Levantar la base de datos ```docker-compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npx tsx prisma/seed.ts```
6. Correr el proyecto ```npm run dev```

