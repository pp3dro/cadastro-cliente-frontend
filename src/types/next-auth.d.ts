import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    //
    id: string;
    name: string;
    email: string;
    token: {
      token_type: string;
      expires_in: number;
      access_token: string;
      refresh_token: string;
    };
  }
}

interface Customer {
  data: {
    id: string;
    name: string;
    email: string;
    contact_phone: number;
    doc_id: number;
    observation: string;
  };
}
