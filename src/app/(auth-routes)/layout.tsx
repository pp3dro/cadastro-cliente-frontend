'use client';

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/utils/login"

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {

  if (isAuthenticated()) {
    redirect('/customers');
  }

  return <>{children}</>
}
