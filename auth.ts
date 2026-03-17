import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { singInSchema } from "./lib/zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
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
