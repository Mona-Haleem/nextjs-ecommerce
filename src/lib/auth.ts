import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { createUser, findUserByEmail, findUserByToken } from "@/lib/db";
import { AppUser } from "./types";

declare module "next-auth" {
    interface Session   {
      user: AppUser
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      userId: string;
    }
  }

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,Facebook, Credentials({
    id: "credentials",
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
        try {
          const validatedCredentials = z
            .object({
              email: z.string().email(),
              password: z.string().min(6),
            })
            .parse(credentials);

          const user = await findUserByEmail(validatedCredentials.email);
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await compare(
              validatedCredentials.password,
              user.password
            );
            
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.userId = user.id || "";
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
          const user = await findUserByToken(token.userId as string);
          if (user) {
             session.user = user;
          }else{
            session.user = await createUser({...session.user,id:(token.userId as string)});
          }
        }
        return session;
      },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
})