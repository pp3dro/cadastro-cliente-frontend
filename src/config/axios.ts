import { isAuthenticated, UserData, getUser } from "@/utils/login";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 1000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  if (isAuthenticated()) {
    const user = getUser();
    config.headers[
      "Authorization"
    ] = `${user.token.token_type} ${user.token.access_token}`;
    return config;
  }
  return config;
});

export default axiosInstance;
