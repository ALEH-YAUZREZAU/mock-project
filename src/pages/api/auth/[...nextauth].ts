import NextAuth from "next-auth";
import jwt from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account, session, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      token.accessToken = jwt.sign(token, process.env.JWT_SECRET as string);

      return token;
    },
    async session({ session, token, user }) {
      const sess = {
        ...session,
        accessToken: token?.accessToken,
        user: {
          ...session.user,
          id: user?.id as string,
        },
      };

      return sess;
    },
  },
});
