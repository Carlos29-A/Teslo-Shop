"use client";

import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store";
import Link from "next/link"
import { IoCartOutline, IoChevronBackOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {

    const openSideMenu = useUiStore(state => state.openSideMenu);
  return (
    <nav className="flex px-5 justify-between items-center w-full">

        {/* Logo */}
        <div>
            <Link
                href="/"
                className="inline-block py-2 transition-all hover:opacity-80"
            >
                <span className={ `${titleFont.className} antialiased font-bold`}>Teslo</span>
                <span>| Shop</span>
            </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden sm:flex items-center gap-1">
            <Link
                className="relative px-3 py-2 text-sm font-medium after:absolute after:bottom-1 after:left-3 after:right-3 after:h-1 after:bg-blue-500 after:scale-x-0 after:origin-center after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                href="/gender/men"
            >
                Hombres
            </Link>
            <Link
                className="relative px-3 py-2 text-sm font-medium after:absolute after:bottom-1 after:left-3 after:right-3 after:h-1 after:bg-blue-500 after:scale-x-0 after:origin-center after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                href="/gender/women"
            >
                Mujeres
            </Link>
            <Link
                className="relative px-3 py-2 text-sm font-medium after:absolute after:bottom-1 after:left-3 after:right-3 after:h-1 after:bg-blue-500 after:scale-x-0 after:origin-center after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                href="/gender/kid"
            >
                Niños
            </Link>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center gap-1">
            <Link
                href="/search"
                className="p-2 rounded-md transition-all hover:bg-gray-100 hover:scale-110"
                title="Buscar"
            >
                <IoSearchOutline className="w-5 h-5" />
            </Link>
            <Link
                href="/cart"
                className="p-2 rounded-md transition-all hover:bg-gray-100 hover:scale-110 relative"
                title="Carrito"
            >
                <span className="absolute text-xs rounded-full px-1 font-bold top-0 -right-2 bg-blue-700 text-white">
                    3
                </span>
                <IoCartOutline className="w-5 h-5"/>
            </Link>
            <button
                className="group flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-out hover:bg-gray-50 cursor-pointer"
                onClick={ () => openSideMenu() }
            >
                Menú
                <IoChevronBackOutline className="w-4 h-4 opacity-0 translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
            </button>
        </div>
    </nav>
  )
}
