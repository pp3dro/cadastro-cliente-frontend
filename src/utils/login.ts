'use client';

import axiosInstance from "@/config/axios";

interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserData extends User {
  token: Token;
}

export async function login(username: string, password: string) {
  try {
    const res = await axiosInstance.post<Token>("oauth/token", {
      username,
      password,
      grant_type: "password",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    })

    if (!res?.data || !res.data.token_type) {
      return null;
    }
  
    const resUser = await axiosInstance.get<User>("/api/user", {headers: {Authorization: `${res.data.token_type} ${res.data.access_token}`}})

    if (!resUser?.data || !resUser.data.name) {
      return null;
    }

    const user: UserData = {...resUser.data, token: res.data}

    localStorage.setItem('session', JSON.stringify(user))

    return user

  } catch(e) {
    console.log(e)
    return null
  }
}

export function logout() {
  localStorage.setItem('session', '{}')
}

export const getUser = (): UserData => {
  if (typeof window === 'undefined') {
    return {} as UserData
  }
  
  const sessionJson = localStorage.getItem('session');

  const session: UserData  = JSON.parse(sessionJson ?? '{}' );

  return session
};

export const isAuthenticated = (): boolean => {
  const user = getUser()
  return user && user.token?.access_token ? true : false
}

export const refreshToken = () => {};
