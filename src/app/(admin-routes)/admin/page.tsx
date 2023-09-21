import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);

  console.log(session);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-none flex-col"> 
        <h1 className="text-2xl mb-8">Logou {session?.name}? Agora pega na minha e balança!</h1>
        <ButtonLogout>Sair</ButtonLogout>
      </div>
    </div>
  );
}
