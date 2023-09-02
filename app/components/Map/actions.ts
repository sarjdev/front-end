import { AxiosError } from "axios";

import { useQuery } from "react-query";
import { LocationData } from "@/app/types";
import axiosInstance from "@/app/services/axiosInstance";

export const useGetLocations = () => {
    return useQuery<LocationData, AxiosError<LocationData>>(
      ["get-location-data"],
      () => {
        return axiosInstance.get(`/search`)?.then(({data}) => data);
      },
      {
        enabled: true
      }
    );
  };
