import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByProviderId,
} from "./data/user";
import { AppUser } from "./types";
import { env } from "process";

declare module "next-auth" {
  interface Session {
    user: AppUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, 
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID!,
      clientSecret: env.FACEBOOK_CLIENT_SECRET!,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validated = z
            .object({
              email: z.string().email(),
              password: z.string().min(6),
            })
            .parse(credentials);

          const user = await findUserByEmail(validated.email);
          if (!user || !user.password) return null;

          const isValid = await compare(validated.password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            username: user.username ?? "",
            email: user.email,
            image: user.image,
            phoneNumber: user.phoneNumber,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        if (account.provider === "credentials") {
          token.userId = user.id!;
          return token;
        }

        const provider = account.provider;
        const providerAccountId = account.providerAccountId;

        let dbUser = await findUserByProviderId(provider, providerAccountId);

        if (!dbUser && user.email) {
          dbUser = await findUserByEmail(user.email);
        }

        if (!dbUser) {
          dbUser = await createUser({
            username: user.name ?? "",
            email: user.email ?? "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            emailVerified: (user as any).email_verified ?? null,
            provider,
            providerAccountId,
          });
        } else {
          // Optional: if dbUser exists but providerAccountId is not linked, link it here using a helper
          //      await linkProviderToUser(dbUser.id, provider, providerAccountId);
        }

        token.userId = dbUser.id;
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.userId) {
        const dbUser = await findUserById(token.userId);
        if (dbUser) {
          session.user = dbUser;
        } else {
          // If user not found, do NOT create a new DB user here.
          // Instead, let frontend handle missing user (e.g. force logout, show an error, or re-authenticate).
          // session.user remains undefined to indicate no linked user.
        }
      }
      return session;
    },

    /**
     * Optional signIn callback
     */
    // async signIn({ user, account, profile, email, credentials }) {
    //   // if (account?.provider !== "credentials" && profile?.email_verified === false) return false;
    //   return true;
    // },

    /**
     * Redirects: safe handling of relative and same-origin URLs
     */
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const incoming = new URL(url);
        if (incoming.origin === baseUrl) return url;
      } catch (err) {
        console.log(err);
        // malformed URL -> fallback
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: env.NEXTAUTH_SECRET,
});
