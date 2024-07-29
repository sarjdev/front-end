import axiosInstance from "@/app/services/axiosInstance";
import { Search } from "@/app/types/search";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetLocations = () => {
  return useQuery<Search, AxiosError<Search>>(
    ["get-location-data"],
    () => {
      return axiosInstance.get(`/search`)?.then(({ data }) => data);
    },
    {
      enabled: true,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  );
};
