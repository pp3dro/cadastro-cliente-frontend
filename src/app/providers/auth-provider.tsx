'use client'

import { isAuthenticated } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    
    useEffect(() => {
        if (window.location.pathname === "/" && isAuthenticated())  {
            router.replace("/customers");
            return;
        }

        if (window.location.pathname !== "/" && !isAuthenticated())  {
            router.replace("/");
            return;
        }

    }, []);

    return <>{children}</>;

}
