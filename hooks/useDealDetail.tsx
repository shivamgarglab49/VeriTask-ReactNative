import VeriTask from "../services";

import { useQuery } from "@tanstack/react-query";
import { Deal, VeriTaskQueries } from "./types";

type UseDealsDetailsQueryKey = [VeriTaskQueries.DealsDetails, string];

const useDealDetail = (dealId: string) => {
  return useQuery<Deal, Error, Deal, UseDealsDetailsQueryKey>({
    queryKey: [VeriTaskQueries.DealsDetails, dealId],
    queryFn: VeriTask.fetchDealDetails.bind(this, dealId),
  });
};

export default useDealDetail;
