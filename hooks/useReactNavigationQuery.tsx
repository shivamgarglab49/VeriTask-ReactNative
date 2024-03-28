import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import {
  QueryKey,
  useQuery,
  QueryClient,
  DefaultError,
  UseQueryResult,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";

export function useReactNavigationQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseQueryResult<TData, TError> {
  const useQueryReturn = useQuery(options, queryClient);
  useFocusEffect(
    useCallback(() => {
      if (
        ((options?.refetchOnWindowFocus && useQueryReturn.isStale) ||
          options?.refetchOnWindowFocus === "always") &&
        options.enabled !== false
      )
        useQueryReturn.refetch();
    }, [options?.enabled, options?.refetchOnWindowFocus])
  );

  return useQueryReturn;
}
