import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
    matcher: [
        '/profile',
        '/orders/:path*',
        '/checkout/:path*',
        '/admin/:path*',
        
    ]
}
