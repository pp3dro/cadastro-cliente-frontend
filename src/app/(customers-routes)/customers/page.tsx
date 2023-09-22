"use client";

import ButtonLogout from "@/components/ButtonLogout";
import { useEffect, useState } from "react";
import { Customer as CustomerType, getCustomers } from "../customers";

export default function Customer() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  useEffect(() => {
    getCustomers().then((c) => setCustomers(c));
  }, []);

  return (
    <>
    <header>
      <div className="">

      </div>
    </header>
    <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-3xl mb-6">Clientes</h1>
        
      </div>
  </>    
  );
}
