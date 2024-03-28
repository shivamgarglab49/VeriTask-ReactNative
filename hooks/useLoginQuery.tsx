import VeriTask from "../services";

import { useMutation } from "@tanstack/react-query";
import { Login, Users, VeriTaskQueries } from "./types";

type UseLoginKey = [VeriTaskQueries.Login];

const useLoginQuery = () => {
  return useMutation<Login, Error, Users, UseLoginKey>({
    mutationKey: [VeriTaskQueries.Login],
    mutationFn: (selectedUser) => {
      return VeriTask.userLogin(selectedUser.id);
    },
  });
};

export default useLoginQuery;
