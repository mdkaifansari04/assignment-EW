import * as Auth from "@/data-access/auth";
import * as User from "@/data-access/user";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: Auth.login,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: User.updateUser,
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: User.deleteUser,
  });
};
