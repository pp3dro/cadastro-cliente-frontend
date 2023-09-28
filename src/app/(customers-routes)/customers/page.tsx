"use client";

import ButtonLogout from "@/components/ButtonLogout";
import { useEffect, useState } from "react";
import {
  Customer as CustomerType,
  getCustomers,
  columns,
  deleteCustomerById,
} from "../customers";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "@/components/EditIcon";
import { DeleteIcon } from "@/components/DeleteIcon";
import { DetailsIcon } from "@/components/DetailsIcon";
import React from "react";
import ModalCustomer from "../modalCustomer";
import { SearchIcon } from "@/components/SearchIcon";

export default function Customer() {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [editCustomer, setEditCustomer] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerType[]>(
    []
  );

  useEffect(() => {
    // Função para filtrar clientes com base no campo de pesquisa
    const filterCustomers = () => {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCustomers(filtered);
    };

    filterCustomers();
  }, [search, customers]);

  const handleEdit = (id: string) => {
    setEditCustomer(id);
    onOpen();
  };

  const handleClose = () => {
    setEditCustomer(null);
    onClose();
  };

  const handleDelete = (id: string) => {
    deleteCustomerById(id).then(() => {
      getCustomers().then((c) => setCustomers(c));
    });
  };

  const onUpdatedCustomers = () => {
    getCustomers().then((c) => setCustomers(c));
  };

  useEffect(() => {
    //função para carregar clientes
    getCustomers().then((c) => setCustomers(c));
  }, []);

  const renderCell = React.useCallback(
    //função para renderizar botoes de ação
    (customer: CustomerType, columnKey: React.Key) => {
      const cellValue = customer[columnKey as keyof CustomerType];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col ">
              <span className="text-bold text-sm capitalize">{cellValue}</span>
              <span className="text-bold text-sm text-default-400">
                {customer.email}
              </span>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip
                content="Detalhes"
                classNames={{
                  base: "dark:dark",
                }}
              >
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <DetailsIcon />
                </span>
              </Tooltip>
              <Tooltip
                content="Editar"
                classNames={{
                  base: "dark:dark",
                }}
              >
                <button
                  onClick={() => handleEdit(customer.id)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Deletar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDelete(customer.id)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-zinc-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex flex-row gap-4 ">
              <div className="flex justify-start items-start rounded-full overflow-hidden">
                <Image
                  width={50}
                  height={50}
                  id="logo"
                  src="/porrabixo.png"
                  alt="logo"
                />
              </div>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Protege
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              <ButtonLogout>Log off</ButtonLogout>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-col gap-4 justify-between items-start mx-auto max-w-screen-xl p-4 ">
        {" "}
        {/* Breadcrumb */}
        <nav className="flex flex-1 w-full" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Clientes
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="w-full flex justify-between items-center font-medium">
          <h2 className="text-xl text-gray-900 dark:text-white">Clientes</h2>
        </div>
      </div>

      <div className="items-center mx-auto max-w-screen-xl px-4 dark:dark">
        <div className="flex justify-between items-center mb-1.5 ">
          {" "}
          {/* Barra de pesquisa */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-zinc-800 focus:outline-none focus:ring focus:ring-blue-500 w-72"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600" />
          <Button
            onPress={onOpen}
            className="text-base text-gray-900 dark:text-white dark:bg-slate-500 dark:hover:bg-slate-600 hover:bg-primary-700 hover:text-white font-medium"
          >
            Novo cliente
          </Button>
        </div>
        <div className="mb-1.5">
          <span className="dark:text-gray-400 text-default-500 text-small">
            Total de clientes: {customers.length}
          </span>
        </div>

        {/* Tabela de clientes */}
        <Table selectionMode="single">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredCustomers}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ModalCustomer
        onClose={handleClose}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        customerId={editCustomer}
        onUpdated={onUpdatedCustomers}
      />
      <footer className="fixed bottom-0 w-full h-14 mt-4 border-t p-4 border-gray-300 dark:border-gray-500">
        <div className="flex flex-col items-center justify-center">
          <span className="text-sm text-gray-400 dark:text-gray-500">
            © 2023 Protege. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
