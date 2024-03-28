import VeriTask from "../services";

import { useQuery } from "@tanstack/react-query";
import { Users, VeriTaskQueries } from "./types";

type UseUsersQueryKey = [VeriTaskQueries.Users];

const useUsers = (role: string, enabled: boolean) => {
  return useQuery<Users[], Error, Users[], UseUsersQueryKey>({
    queryKey: [VeriTaskQueries.Users],
    queryFn: VeriTask.fetchUsers.bind(this, role),
    enabled,
  });
};

export default useUsers;
