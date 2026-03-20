import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { singInSchema } from "./lib/zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        // Sesión siempre alineada con la BD (el JWT guarda datos del login y no se actualiza solo)
        async session({ session, token }) {
            const userId =
                (typeof token.sub === "string" && token.sub) ||
                (token.data as { id?: string } | undefined)?.id;

            if (userId) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: userId },
                });
                if (dbUser) {
                    const { password: _, ...userData } = dbUser;
                    session.user = userData as typeof session.user;
                    return session;
                }
            }

            if (token.data) {
                session.user = token.data as typeof session.user;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials){
                const parsedCredentials = singInSchema.safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase()
                    }
                });

                if( !user ) return null;

                if( !bcrypt.compareSync(password, user.password)) return null;

                const { password: _, ...userData } = user;
                console.log({userData});
                return userData;
            }
        })
    ],
})
