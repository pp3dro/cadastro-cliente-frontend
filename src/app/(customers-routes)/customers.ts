import axiosInstance from "@/config/axios";

interface Reponse {
    data: Customer[]
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    contact_phone: number;
    doc_id: number;
    observation: string;
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const customers = await axiosInstance.get<Reponse>("api/customers");
    return customers.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
