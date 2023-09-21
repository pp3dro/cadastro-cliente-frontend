import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions); //obter a sessao do lado do servidor (verificar antes de renderizar se o usuario tem sessao ativa ou não)

  if (!session) {
    redirect('/');
  }

  return <>{children}</>
}
