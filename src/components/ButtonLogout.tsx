'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"
import Button from "./Button"


export default function ButtonLogout({ children }: { children : React.ReactNode}) {
    

  const router = useRouter()

  async function logout() {
    await signOut({
      redirect: false
    })

    router.replace('/')
  }

  return(
    <Button onClick={logout}>{children}</Button>
  )

};
