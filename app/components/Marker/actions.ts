import axiosInstance from "@/app/services/axiosInstance";
import { TooltipData } from "@/app/types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetCertaionLocation = ({ chargingStationId }: { chargingStationId: string }) => {
  return useQuery<TooltipData, AxiosError<TooltipData>>(
    ["get-certain-location-data"],
    () => {
      return axiosInstance
        .get(`/charging-stations/${chargingStationId}/detail`)
        ?.then(({ data }) => data);
    },
    {
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  );
};
