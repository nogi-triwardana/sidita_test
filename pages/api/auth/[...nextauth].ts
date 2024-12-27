import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import { verifyPassword } from "@/utils/helpers";
import axios from "axios";
import { loginService } from "@/services";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const response = await loginService({ 
            email: credentials?.email, 
            password: credentials?.password 
          });

          return {
            ...response?.data?.data,
            id: response?.data?.data?.id?.toString(),
            role: response?.data?.data?.role,
          };  
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if(token) {
        session.user = { 
          ...session.user,
          id: token.id,
          name: token.name, 
          email: token.email,
          role: token.role, 
        }
      }

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
}

export default NextAuth(authOptions);
