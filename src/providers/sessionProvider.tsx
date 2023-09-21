'use client'
//provider que vai cobrir toda a aplicação com eses provedor para fazer a gestão de autenticação da aplicação
import { ReactNode } from "react"; //ReactNode: tipo importado do modulo react. usando p/ representar qualquer elemento que possa ser renderizado no React, como componente, texto, HTML, etc.
import { SessionProvider } from "next-auth/react"; // SessionProvider é uma parte do NextAuth, que fornece gerenciamento de sessão de autenticação em aplicativos Next

interface NextAuthSessionProviderProps {
  // interface definida para descrever as propriedades aceitas pelo componente
  children: ReactNode; // propriedade é usada para passar os componentes filhos que serão envolvidos pelo SessionProvider
}

export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) { //componente
  return <SessionProvider>{children}</SessionProvider>;
}
//função que recebe um objeto de propriedades chamado NextAuthSessionProviderProps, onde esse objeto é desestruturado para acessar a propriedade children
