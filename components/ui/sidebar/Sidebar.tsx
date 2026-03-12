"use client";

import { useUiStore } from "@/store";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import clsx from "clsx";
import { SidebarLinks } from "./SidebarLinks";

export const Sidebar = () => {

    const isSideMenu = useUiStore(state => state.isSideMenuOpen);
    const closeMenu = useUiStore(state => state.closeSideMenu); 
    const links = SidebarLinks;

    return (
        <div>
            { /* Background Black */}
            {
                isSideMenu && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" ></div>
                )
            }
            {/* Background Blur */}
            {
                isSideMenu && (
                    <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-blur-sm backdrop-filter" onClick={ () => closeMenu() }></div>
                )
            }
            {/* SideMenu  */}
            <nav
            className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenu,
                    }
                )
            } 
            >
                <IoCloseOutline
                    size={ 50 }
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={ () => closeMenu() }
                />

                {/* Input  */}
                <div className="relative mt-14">
                    <IoSearchOutline
                        size={ 20 }
                        className="absolute top-2 left-2"
                    />
                    <input
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none
                            focus:border-blue-500
                        "
                    />
                </div>

                {/* Menú */}
                {
                    links && links.map((link, index) =>
                        link.href === "/auth/logout"
                            ? (
                                <div
                                    key={ `${ link.href }-${ index }` }
                                    className="w-full bg-gray-200 h-px mt-10"
                                />
                            )
                            : (
                                <Link
                                    key={ `${ link.href }-${ index }` }
                                    href={ link.href }
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all "
                                >
                                    <link.icon size={ 30 } />
                                    <span className="ml-3 text-xl">{ link.label }</span>
                                </Link>
                            )
                    )
                }
            </nav>
        </div>
    )
}
