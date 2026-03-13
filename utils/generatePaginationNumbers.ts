// [1,2,3,4,5,6,7,...]
export const generatePagination = ( currentPage: number, totalPages: number) => {
    // Si el numero total de paginas es menor a 7, se devuelven todos los numeros
    if ( totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Si esta entre las  3 primeras paginas
    // mostrar las 3 primeras paginas, puntos suspensivos, y los 2 ultimos puntos
    if( currentPage <= 3) {
        return [
            1, 2, 3, "...", totalPages - 1, totalPages
        ]
    }
    // Si la página actual esta entre las 3 ultimas paginas
    // mostrar los 2 primeros puntos, las 3 paginas anteriores, puntos suspensivos, y las 2 ultimas paginas
    if ( currentPage >= totalPages - 2) {
        return [
            1,2, '...', totalPages - 2, totalPages - 1, totalPages
        ]
    }
    // Si la página actual esta en otro lugar medio
    // mostrar la primera página, puntos suspensivos, la pagina actual y los vecinos
    return [
        1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages
    ]
}