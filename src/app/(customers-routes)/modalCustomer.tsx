import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { get } from "http";
import {
  getCustomerAddress,
  getCustomerById,
  saveCustomer,
  saveCustomerAddress,
  updateCustomer,
  updateCustomerAddress,
} from "./customers";

type ModalCustomerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
  customerId: string | null;
};

type customerData = {
  id: string;
  name: string;
  email: string;
  contact_phone: string;
  doc_id: string;
  observation: string;
};

type addressData = {
  postal_code: string;
  street: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

export default function ModalCustomer(props: ModalCustomerProps) {
  const { isOpen, onOpen, onOpenChange, onClose, customerId } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [customer, setCustomer] = useState<customerData>({
    id: "",
    name: "",
    email: "",
    contact_phone: "",
    doc_id: "",
    observation: "",
  });

  const [address, setAddress] = useState<addressData>({
    postal_code: "",
    street: "",
    complement: "",
    district: "",
    city: "",
    state: "",
  });

  const validationRules: { [key: string]: (value: string) => string } = {
    name: (value) => (!value ? "Campo nome é obrigatório." : ""),
    email: (value) => (!value ? "Campo email é obrigatório." : ""),
    // Adicionar regras para outros campos conforme necessário
  };

  useEffect(() => {
    if (customerId !== null && customerId !== "") {
      setLoading(true); // Ativar loading durante a busca

      getCustomerById(customerId)
        .then((c) => {
          setCustomer(c);
          setLoading(false); // Desativar loading após o retorno
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false); // Desativar loading em caso de erro
        });
    } else {
      setCustomer({
        id: "",
        name: "",
        email: "",
        contact_phone: "",
        doc_id: "",
        observation: "",
      });
    }
  }, [customerId]);

  useEffect(() => {
    if (!isOpen) {
      setCustomer({
        id: "",
        name: "",
        email: "",
        contact_phone: "",
        doc_id: "",
        observation: "",
      });
      setFormErrors({});
    } else {
      setFormErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    setLoading(true); // Ativar loading durante a busca

    if (customerId !== null && customerId !== "") {
      getCustomerAddress(customerId)
        .then((c) => {
          setAddress(c);
          setLoading(false); // Desativar loading após o retorno
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false); // Desativar loading em caso de erro
        });
    } else {
      setAddress({
        postal_code: "",
        street: "",
        complement: "",
        district: "",
        city: "",
        state: "",
      });
      setLoading(false);
    }
  }, [customerId]);

  const handleSaveCustomer = () => {
    setLoading(true);

    const errors: { [key: string]: string } = {};

    Object.keys(validationRules).forEach((field) => {
      const fieldName = field as keyof customerData;
      const validationFunction = validationRules[fieldName];
      const errorMessage = validationFunction(customer[fieldName]);

      if (errorMessage) {
        errors[fieldName] = errorMessage;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    if (props.customerId) {
      updateCustomer(customer)
        .then(() => {
          setLoading(false);
          props.onUpdated();
          onClose();
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      saveCustomer(customer)
        .then(() => {
          setLoading(false);
          props.onUpdated();
          onClose();
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    }
  };

  const handleSaveAddressCustomer = () => {
    setLoading(true);

    if (props.customerId) {
      updateCustomerAddress(customerId, address)
        .then(() => {
          setLoading(false);
          props.onUpdated();
          onClose();
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      saveCustomerAddress(customerId, address)
        .then(() => {
          setLoading(false);
          props.onUpdated();
          onClose();
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="dark:dark flex ">
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="4xl"
          classNames={{
            body: "py-4",
            backdrop: "blur",
            base: "dark:dark",
            header: "dark:dark",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {loading && <p>Loading...</p>}
            <ModalHeader className="flex flex-col items-center text-xl font-bold dark:dark">
              {props.customerId ? "EDITAR CLIENTE" : "CRIAR CLIENTE"}
            </ModalHeader>

            <span className="flex item-start px-6 py-2 bg-gradient-to-r from-gray-50 to-slate-300 dark:from-zinc-900 dark:to-slate-700/25 text-gray-900 dark:text-white text-base font-semibold">
              Dados pessoais
            </span>

            <ModalBody>
              <div className="grid grid-cols-12 gap-x-4 gap-y-1">
                <div className="col-span-6 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        props.customerId
                          ? "Edit customer's name"
                          : "Enter customer's name"
                      }
                      value={customer.name}
                      onChange={(e) =>
                        setCustomer({ ...customer, name: e.target.value })
                      }
                      required
                    />
                    <span className="text-red-500 text-xs italic">
                      {formErrors.name}
                    </span>
                  </div>
                </div>
                <div className="col-span-6 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        props.customerId
                          ? "Edit customer's email"
                          : "Enter customer's email"
                      }
                      value={customer.email}
                      onChange={(e) =>
                        setCustomer({ ...customer, email: e.target.value })
                      }
                      required
                    />
                    <span className="text-red-500 text-xs italic">
                      {formErrors.email}
                    </span>
                  </div>
                </div>
                <div className="col-span-6 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contato
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        props.customerId
                          ? "Edit customer's phone"
                          : "Enter customer's phone"
                      }
                      value={customer.contact_phone}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          contact_phone: e.target.value,
                        })
                      }
                    />
                    <span className="text-red-500 text-xs italic">
                      {formErrors.contact_phone}
                    </span>
                  </div>
                </div>
                <div className="col-span-6 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CPF
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={
                        props.customerId
                          ? "Edit customer's CPF"
                          : "Enter customer's CPF"
                      }
                      value={customer.doc_id}
                      onChange={(e) =>
                        setCustomer({ ...customer, doc_id: e.target.value })
                      }
                    />
                    <span className="text-red-500 text-xs italic">
                      {formErrors.doc_id}
                    </span>
                  </div>
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="observation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Observação
                  </label>
                  <textarea
                    id="observation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={
                      props.customerId
                        ? "Edit customer's observation"
                        : "Enter customer's observation"
                    }
                    value={customer.observation}
                    onChange={(e) =>
                      setCustomer({ ...customer, observation: e.target.value })
                    }
                  />
                </div>
              </div>
            </ModalBody>

            <span className="flex item-start px-6 py-2 bg-gradient-to-r from-gray-50 to-slate-300 dark:from-zinc-900 dark:to-slate-700/25 text-gray-900 dark:text-white text-base font-semibold">
              Endereço
            </span>

            <ModalBody>
              <div className="grid grid-cols-12 gap-x-4 gap-y-1">
                <div className="col-span-3 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CEP
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="ex: 7400000"
                      value={address.postal_code}
                      onChange={(e) =>
                        setAddress({ ...address, postal_code: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-span-9 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rua
                    </label>
                    <input
                      type="text"
                      id="street"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-span-12 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="street"
                      placeholder="Apartamento/Bloco, Casa, Quadra, Lote, Número, etc."
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={address.complement}
                      onChange={(e) =>
                        setAddress({ ...address, complement: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-span-4 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="street"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={address.district}
                      onChange={(e) =>
                        setAddress({ ...address, district: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-span-4 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Estado
                    </label>
                    <input
                      type="text"
                      id="street"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-span-4 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="street"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className="font-medium"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                className="font-medium"
                color="primary"
                onPress={() => {
                  handleSaveCustomer();
                  handleSaveAddressCustomer();
                }}
              >
                {props.customerId ? "Edit" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
