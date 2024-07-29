import axiosInstance from "@/app/services/axiosInstance";
import { SearchDetail } from "@/app/types/search-detail";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetCertaionLocation = ({ chargingStationId }: { chargingStationId: string }) => {
  return useQuery<SearchDetail, AxiosError<SearchDetail>>(
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
