import VeriTask from "../services";

import { useQuery } from "@tanstack/react-query";
import { RejectReason, VeriTaskQueries } from "./types";

type UseRejectReasonsQueryKey = [VeriTaskQueries.RejectReasons];

const useRejectReasons = () => {
  return useQuery<
    RejectReason[],
    Error,
    RejectReason[],
    UseRejectReasonsQueryKey
  >({
    queryKey: [VeriTaskQueries.RejectReasons],
    queryFn: VeriTask.rejectReasons.bind(this),
  });
};

export default useRejectReasons;
