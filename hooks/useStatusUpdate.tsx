import VeriTask from "../services";

import { useMutation } from "@tanstack/react-query";
import { Deal, DealUpdateRequestBody, VeriTaskQueries } from "./types";

type UseDealStatusUpdateKey = [VeriTaskQueries.StatusUpdate];

const useStatusUpdate = (dealId: string) => {
  return useMutation<
    Deal,
    Error,
    DealUpdateRequestBody,
    UseDealStatusUpdateKey
  >({
    mutationKey: [VeriTaskQueries.StatusUpdate],
    mutationFn: async (body: DealUpdateRequestBody) => {
      return await VeriTask.changeDealStatus(dealId, body);
    },
  });
};

export default useStatusUpdate;
