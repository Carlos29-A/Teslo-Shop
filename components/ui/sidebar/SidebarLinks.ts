import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

interface SidebarLink {
    label: string;
    icon: React.ElementType;
    href: string;
}

export const SidebarLinks: SidebarLink[] = [
    {
        label: 'Perfil',
        icon: IoPersonOutline,
        href: '/profile'
    },
    {
        label: 'Ordenes',
        icon: IoTicketOutline,
        href: '/orders'
    },
    {
        label: 'Ingresar',
        icon: IoLogInOutline,
        href: '/login'
    },
    {
        label: 'Salir',
        icon: IoLogOutOutline,
        href: '/auth/logout'
    },
    {
        label: 'Productos',
        icon: IoShirtOutline,
        href: '/products'
    },
    {
        label: 'Ordenes',
        icon: IoTicketOutline,
        href: '/orders'
    },
    {
        label: 'Usuarios',
        icon: IoPeopleOutline,
        href: '/users'
    }
]