'use client';
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/utils/login"

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  // const session = await getServerSession(nextAuthOptions); //obter a sessao do lado do servidor (verificar antes de renderizar se o usuario tem sessao ativa ou não)

  if (!isAuthenticated()) {
    redirect('/');
  }

  return <>{children}</>
}
