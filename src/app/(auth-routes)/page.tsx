"use client"; //funciona como client component - p/ trablhar com states(estados) do react

import Button from "@/components/Button";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export default function Home() {
  //
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter(); //hook do next

  async function handleSubmit(event: SyntheticEvent) {
    //
    event.preventDefault(); //para não enviar nada p/ controlar manualmente o envio do formulário

    const result = await signIn("credentials", {
      //método de signIn do nextauth com o nome do provedor criado 'Credentials', para fazer o login
      username,
      password,
      redirect: false, //nao redireciona autom. para uma pag. específica, o controle será feito manualmente
    });

    if (result?.error) {
      //se houver erro
      alert("Erro ao fazer login"); //exibe um alerta
      return;
    }

    const session = await getServerSession(nextAuthOptions)
    
    localStorage.setItem('session', JSON.stringify(session))

    router.replace("/customers"); // caso faça o login redireciona para o /admin e quando clicar em "voltar" não volta mais para a pag de login; inicia um hostórico novo
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        {" "}
        {/* quando enviado executar a função handleSubmit */}
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text"
          name="username"
          placeholder="Digite seu e-mail"
          onChange={(e) => setUsername(e.target.value)} //altera o estado do email
        />
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)} //altera o estado da senha
        />
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
