"use client";

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") return `${pathname}?${params.toString()}`;
    if (+pageNumber <= 0) return `${pathname}`;
    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`;

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center mt-10 mb-32">
      <nav aria-label="Paginación">
        <ul className="flex items-center gap-1">

          {/* Anterior */}
          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              aria-disabled={isFirst}
              className={clsx(
                "flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200",
                isFirst
                  ? "text-gray-300 pointer-events-none"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <IoChevronBackOutline size={18} />
            </Link>
          </li>

          {/* Páginas */}
          {allPages.map((page, index) => (
            <li key={`${page}-${index}`}>
              {page === "..." ? (
                <span className="flex items-center justify-center w-9 h-9 text-gray-400 text-sm select-none">
                  …
                </span>
              ) : (
                <Link
                  href={createPageUrl(page)}
                  className={clsx(
                    "flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium transition-all duration-200",
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-110"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  {page}
                </Link>
              )}
            </li>
          ))}

          {/* Siguiente */}
          <li>
            <Link
              href={createPageUrl(currentPage + 1)}
              aria-disabled={isLast}
              className={clsx(
                "flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200",
                isLast
                  ? "text-gray-300 pointer-events-none"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              )}
            >
              <IoChevronForwardOutline size={18} />
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
};
