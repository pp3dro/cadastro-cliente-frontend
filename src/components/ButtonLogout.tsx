'use client'

import Button from "@/components/Button"
import { logout } from "@/utils/login"
import { useRouter } from "next/navigation"
import React from "react"


export default function ButtonLogout({ children }: { children : React.ReactNode}) {
    

  const router = useRouter()

  function handleLogout() {
    logout()

    router.replace('/')
  }

  return(
    <Button onClick={handleLogout}>{children}</Button>
  )

};
