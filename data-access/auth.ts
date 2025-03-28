import { AuthResponse } from "@/types/data-types";
import axios from "axios";

const authApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_HOST_URL });

export const login = async (body: { email: string; password: string }) => {
  const { data } = await authApi.post<AuthResponse>("/login", body);
  return data.token;
};
