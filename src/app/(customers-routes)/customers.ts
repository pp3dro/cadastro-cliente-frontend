import axiosInstance from "@/config/axios";

export interface Response<T>{
    data: T;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    contact_phone: string;
    doc_id: string;
    observation: string;
}

export const columns = [
  {name: "NAME", uid: "name"},
  {name: "TELEFONE", uid: "contact_phone"},
  {name: "CPF", uid: "doc_id"},
  {name: "OBSERVAÇÃO", uid: "observation"},
  {name: "AÇÕES", uid: "actions"},
];

export async function getCustomers(): Promise<Customer[]> {
  try {
    const customers = await axiosInstance.get<Response<Customer[]>>("api/customers");
    return customers.data.data;
  } catch (error) {
    alert("Erro ao buscar clientes")
    return [];
  }
}

export async function getCustomerById (id: string): Promise<Customer> {
  try {
    const customer = await axiosInstance.get<Response<Customer>>(`api/customers/${id}`);
    return customer.data.data;
  } catch (error) {
    alert("Erro ao buscar cliente")
    return {} as Customer;
  }
}

export async function saveCustomer(customer: Customer): Promise<Customer> {
  try {
    const res = await axiosInstance.post<Response<Customer>>("api/customers", customer);
    console.log("resposta do server:", res.data);
    return res.data.data;
  } catch (error) {
    alert("Erro ao salvar ou criar cliente")
    return {} as Customer;
  }
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  try {
    const res = await axiosInstance.put<Response<Customer>>(`api/customers/${customer.id}`, customer);
    return res.data.data;
  } catch (error) {
    alert("Erro ao atualizar cliente")
    return {} as Customer;
  }
}

export async function deleteCustomerById(id: string): Promise<void> {
  try {
    await axiosInstance.delete<Response<Customer>>(`api/customers/${id}`);
  } catch (error) {
    alert("Erro ao deletar cliente")
  }
}


export interface Address {
  postal_code: string;
  street: string;
  district: string;
  complement: string;
  city: string;
  state: string;
}

export async function getCustomerAddress(id: string): Promise<Address>{
  try {
      const address = await axiosInstance.get<Response<Address>>(`api/customers/${id}/address`);
      return address.data.data;
  } catch (error) {
      alert("Erro ao buscar endereço")
      return {} as Address;
  }
}

export async function saveCustomerAddress(id: string | null, address: Address): Promise<Address> {
  try {
    const res = await axiosInstance.post<Response<Address>>(`api/customers/${id}/address`, address);
    return res.data.data;
  } catch (error) {
    alert("Erro ao salvar ou criar endereço")
    return {} as Address;
  }
}

export async function updateCustomerAddress(id: string | null, address: Address): Promise<Address> {
  try {
    const res = await axiosInstance.patch<Response<Address>>(`api/customers/${id}/address`, address);
    return res.data.data;
  } catch (error) {
    alert("Erro ao atualizar endereço")
    return {} as Address;
  }
}

