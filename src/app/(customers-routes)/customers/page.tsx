'use client'

import ButtonLogout from "@/components/ButtonLogout";
import { useEffect, useState } from "react";
import axios from "@/config/axios"; 
import { Customer } from "@/types/next-auth";


export default function Customer() {

  const [customers, setCustomers] = useState<typeof Customer[]>([]);

  useEffect(() => {
    axios.get('customers')
      .then((response): Customer => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    // <div className="flex flex-col items-center justify-center w-full h-screen">
    //   <h1 className="text-3xl mb-6">Customers</h1>

    //   <div className="w-[400px] flex flex-col gap-6">
    //     {customers.map((customer) => (
    //       <div key={customer.id} className="flex flex-col gap-2">
    //         <span>Nome: {customer.name}</span>
    //         <span>Email: {customer.email}</span>
    //         <span>Telefone: {customer.phone}</span>
    //       </div>
    //     ))}
      <div>
      <ButtonLogout> Sair </ButtonLogout>
    </div>
  );
}
