import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    //provedores: aqui dentro diz qual tipo de autenticação (google, email e senha - credentials de um backend proprio, facebook, github, etc)
    CredentialsProvider({
      //caracterização das credenciais de email e senha 'próprios'
      name: "credentials",
      credentials: {
        //objeto credentials -> o que vai receber de credenciais para realizar o login (email e senha)
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      }, // types do <input> email e senha

      async authorize(credentials, req) {
        //método onde implementa a chamada pra API onde será feita a autenticação -> authorize funçao padrão do credentials provider
        const res = await fetch("http://localhost:8000/oauth/token", {
          // informações da requisição
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
            grant_type: "password",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          }),
        });

        const token = await res.json(); //pegar os dados do login

        if (!token || !res.ok) {
          return null;
        }

        const resUser = await fetch("http://localhost:8000/api/user", {
          // informações da requisição
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });

        const user = await resUser.json(); //pegar os dados do login

        if (user && resUser.ok) {
          //checagem se existir o user e se response retornar um ok (response.ok do fetch) retorna a const user
          user.token = token;
          return user;
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/",
  },

  callbacks: {
    //funçoes chamadas a cada ação do NextAuth
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions); //aqui dentro todas configs de autenticação do nextauth

export { handler as GET, handler as POST, nextAuthOptions };
