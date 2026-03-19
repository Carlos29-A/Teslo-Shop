import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

interface SidebarLink {
    label: string;
    icon: React.ElementType;
    href: string;
    adminOnly?: boolean;
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
        href: '/auth/login'
    },
    {
        label: 'Salir',
        icon: IoLogOutOutline,
        href: '/auth/logout'
    },
    {
        label: 'Usuarios',
        icon: IoPeopleOutline,
        href: '/admin/users',
        adminOnly: true
    },
    {
        label: 'Productos',
        icon: IoShirtOutline,
        href: '/admin/products',
        adminOnly: true
    },
    {
        label: 'Ordenes',
        icon: IoTicketOutline,
        href: '/admin/orders',
        adminOnly: true
    }
]