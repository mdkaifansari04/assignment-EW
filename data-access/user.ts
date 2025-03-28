import { User } from "@/types";
import { UserApiResponse, UserUpdateResponse } from "@/types/data-types";
import axios from "axios";

const userApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/users` });

export const getUser = async (pageNumber: number) => {
  const { data } = await userApi.get<UserApiResponse>(`?page=${pageNumber}`);
  return data;
};

export const updateUser = async (user: User) => {
  const { data } = await userApi.put<UserUpdateResponse>(`/${user.id}`);
  return data;
};

export const deleteUser = async (user: User) => {
  const { data } = await userApi.delete(`/${user.id}`);
  return data;
};
