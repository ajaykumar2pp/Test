import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma.js";
import { compare } from "bcryptjs";


export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // console.log("User found:", user);

        if (!user) throw new Error("User not found.");

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          gender: user.gender,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
        token.gender = user.gender;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.fullName = token.fullName;
      session.user.gender = token.gender;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
