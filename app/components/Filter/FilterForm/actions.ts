import axiosInstance from "@/app/services/axiosInstance";
import { FilterFormRequest, FilteredLocationResponse } from "@/app/types";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useGetFilteredData = () => {
  return useMutation<
    FilteredLocationResponse,
    AxiosError<FilteredLocationResponse>,
    FilterFormRequest
  >({
    mutationFn: (data: FilterFormRequest) => {
      return axiosInstance.get(
        `/search/nearest?latitude=${data?.latitude}&longitude=${data?.longitude}&distance=${data?.distance}&size=${data?.size}`
      );
    }
  });
};
