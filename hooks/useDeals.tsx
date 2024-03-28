import VeriTask from "../services";

import { Deal, VeriTaskQueries } from "./types";
import { useReactNavigationQuery } from "./useReactNavigationQuery";

type UseDealsQueryKey = [VeriTaskQueries.Deals];

const useDeals = () => {
  return useReactNavigationQuery<Deal[], Error, Deal[], UseDealsQueryKey>({
    queryKey: [VeriTaskQueries.Deals],
    queryFn: VeriTask.fetchDeals,
    refetchOnWindowFocus: "always",
  });
};

export default useDeals;
