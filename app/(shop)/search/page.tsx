import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginationProductsWithImages } from "@/actions";
import type { Metadata } from "next";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Buscar | Tienda",
  description: "Busca productos en la tienda",
};

/** Nombre en BD (seed) → etiqueta en pantalla */
const CATEGORY_FILTERS = [
  { dbName: "Pants", labelEs: "Pantalones" },
  { dbName: "Hoodies", labelEs: "Sudaderas" },
  { dbName: "Hats", labelEs: "Gorras" },
  { dbName: "Shirts", labelEs: "Camisas" },
] as const;

function buildSearchHref(opts: {
  q: string;
  cat: string;
  page?: string;
}) {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", opts.page);
  if (opts.q) params.set("q", opts.q);
  if (opts.cat) params.set("cat", opts.cat);
  const s = params.toString();
  return s ? `/search?${s}` : "/search";
}

interface Props {
  searchParams: Promise<{ page?: string; q?: string; cat?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { page, q, cat } = await searchParams;

  const pageNumber = page ? parseInt(page, 10) : 1;
  const query = (q ?? "").trim();
  const activeCat = (cat ?? "").trim();

  const validDbNames = new Set(
    CATEGORY_FILTERS.map((c) => c.dbName.toLowerCase())
  );
  const categoryName =
    activeCat && validDbNames.has(activeCat.toLowerCase())
      ? CATEGORY_FILTERS.find(
          (c) => c.dbName.toLowerCase() === activeCat.toLowerCase()
        )!.dbName
      : undefined;

  const { products, totalPages } = await getPaginationProductsWithImages({
    page: pageNumber,
    query: query || undefined,
    categoryName,
  });

  return (
    <>
      <div className="min-h-[50vh] px-4">
        <Title title="Buscar" subtitle="Encuentra lo que necesitas" />

        <div className="mx-auto mt-4 max-w-2xl">
          <form action="/search" method="get" className="relative">
            <input type="hidden" name="page" value="1" />
            {categoryName ? (
              <input type="hidden" name="cat" value={categoryName} />
            ) : null}
            <label htmlFor="search-query" className="sr-only">
              Buscar productos
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <IoSearchOutline className="h-6 w-6" aria-hidden />
            </div>
            <input
              id="search-query"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Nombre, categoría o palabra clave…"
              autoComplete="off"
              className="w-full rounded-2xl border border-gray-200 bg-white/80 py-4 pl-12 pr-14 text-base text-gray-900 shadow-sm outline-none ring-0 transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 flex items-center p-4 text-gray-500 transition hover:text-gray-800"
              aria-label="Buscar"
            >
              <IoSearchOutline className="h-6 w-6" aria-hidden />
            </button>
          </form>

          <p className="mt-3 text-center text-sm text-gray-500">
            Escribe y pulsa{" "}
            <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600">
              Enter
            </kbd>{" "}
            para buscar en la tienda.
          </p>

          <div className="mt-10">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
              Categorías
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href={buildSearchHref({ q: query, cat: "", page: "1" })}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm transition",
                  !categoryName
                    ? "border-blue-600 bg-blue-50 font-medium text-blue-800"
                    : "border-gray-200 bg-gray-50/80 text-gray-600 hover:border-gray-300 hover:bg-gray-100"
                )}
              >
                Todas
              </Link>
              {CATEGORY_FILTERS.map(({ dbName, labelEs }) => {
                const isActive =
                  categoryName?.toLowerCase() === dbName.toLowerCase();
                return (
                  <Link
                    key={dbName}
                    href={buildSearchHref({
                      q: query,
                      cat: dbName,
                      page: "1",
                    })}
                    className={clsx(
                      "rounded-full border px-4 py-2 text-sm transition",
                      isActive
                        ? "border-blue-600 bg-blue-50 font-medium text-blue-800"
                        : "border-gray-200 bg-gray-50/80 text-gray-600 hover:border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    {labelEs}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {(query || categoryName) && products.length === 0 && (
        <p className="mx-auto mt-8 max-w-2xl text-center text-gray-500">
          No hay resultados
          {query ? (
            <>
              {" "}
              para &quot;{query}&quot;
            </>
          ) : null}
          {categoryName ? (
            <>
              {query ? " " : ""}
              en{" "}
              <span className="font-medium">
                {
                  CATEGORY_FILTERS.find(
                    (c) =>
                      c.dbName.toLowerCase() === categoryName.toLowerCase()
                  )?.labelEs
                }
              </span>
            </>
          ) : null}
          . Prueba con otras palabras o categoría.
        </p>
      )}

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
