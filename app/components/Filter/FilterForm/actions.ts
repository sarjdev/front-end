import axiosInstance from "@/app/services/axiosInstance";
import { FilterFormRequest } from "@/app/types";
import { SearchNearest } from "@/app/types/search-nearest";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useGetFilteredData = () => {
  return useMutation<SearchNearest, AxiosError<SearchNearest>, FilterFormRequest>({
    mutationFn: (data: FilterFormRequest) => {
      return axiosInstance
        .get(
          `/search/nearest?latitude=${data?.latitude}&longitude=${data?.longitude}&distance=${data?.distance}&size=${data?.size}`
        )
        ?.then(({ data }) => data);
    }
  });
};
