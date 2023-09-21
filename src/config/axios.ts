import axios, { AxiosRequestConfig } from "axios";

interface UserData {
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

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:8000/api/",
    timeout: 1000,
    };

const sessionJson = localStorage.getItem('session');

const session: UserData | null | undefined  = JSON.parse(sessionJson ?? '{}' );

if (sessionJson && session && session?.token) {
    config.headers = { Authorization: `${session.token.token_type} ${session.token.access_token}` };
}

const instance = axios.create(config);

export default instance;