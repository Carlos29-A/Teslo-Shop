import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const role = (auth?.user as any)?.role;

            const isOnAdminPage = nextUrl.pathname.startsWith('/admin');

            if (isOnAdminPage) {
                if (isLoggedIn && role === 'admin') return true;
                if (isLoggedIn) return NextResponse.redirect(new URL('/', nextUrl));
                return false;
            }

            if (!isLoggedIn) return false;

            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token }) {
            session.user = token.data as any;
            return session;
        }
    },
    providers: [],
}
