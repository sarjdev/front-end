import axiosInstance from "@/app/services/axiosInstance";
import { LocationData } from "@/app/types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetLocations = () => {
  return useQuery<LocationData, AxiosError<LocationData>>(
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
