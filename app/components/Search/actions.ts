import { AxiosError } from "axios";

import { useQuery } from "react-query";
import { SuggestionSearchResponse } from "@/app/types";
import axiosInstance from "@/app/services/axiosInstance";

export const useSearch = ({ q, size = 5 }: { q: string; size?: number }) => {
  return useQuery<SuggestionSearchResponse, AxiosError<SuggestionSearchResponse>>(
    ["get-search"],
    () => {
      return axiosInstance.get(`/search/suggest?q=${q}&size=${size}`)?.then(({ data }) => data);
    },
    {
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false
    }
  );
};
