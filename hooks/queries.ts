import * as User from "@/data-access/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: () => User.getUser(),
  });
};
