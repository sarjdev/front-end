import { FilterFormSchema } from "@/app/schema/filterFormSchema";
import { generalStore } from "@/app/stores/generalStore";
import { Location } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import FormProvider from "../../Form/FormProvider/FormProvider";
import RangeInput from "../../Form/RangeInput/RangeInput";
import FilteredCard from "../FilteredCard/FilteredCard";
import { useGetFilteredData } from "./actions";

import "./styles.scss";

type FilteredCardType = {
  handleClickToCenter: (location: Location) => void;
};

const FilterForm: FC<FilteredCardType> = ({ handleClickToCenter }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(FilterFormSchema),
    defaultValues: {
      distance: 10,
      size: 10
    }
  });
  const { location, actions } = generalStore();
  const { enqueueSnackbar } = useSnackbar();

  const { watch, handleSubmit } = methods;

  const values = watch();

  const filterData = useGetFilteredData();

  const onSubmit = handleSubmit(async (data) => {
    if (location && location?.[0] && location?.[1]) {
      setLoading(true);
      try {
        filterData.mutate(
          {
            longitude: location?.[1] ?? 0,
            latitude: location?.[0] ?? 0,
            distance: data.distance,
            size: data.size
          },
          {
            onSuccess: (data) => {
              setLoading(false);
              actions.setFilteredLocationData(data.data);
            },
            onError: (error) => {
              setLoading(false);
              enqueueSnackbar("Konumlar filtrelenirken bir hata oluştu", { variant: "error" });
            }
          }
        );
      } catch (error) {
        setLoading(false);
        enqueueSnackbar("Konumlar filtrelenirken bir hata oluştu", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Filtreleme yapabilmek için konum erişimine izin vermeniz gerekmektedir!", {
        variant: "warning"
      });
    }
  });

  return (
    <div className="filter-section">
      <FormProvider methods={methods} onSubmit={onSubmit} className="filter-section-form">
        <h3>Filtrele</h3>
        <div>
          <span>Mesafe {`(${values.distance} km)`}</span>
          <RangeInput name="distance" min={1} max={20} />
        </div>
        <div>
          <span>Adet {`(${values.size})`}</span>
          <RangeInput name="size" min={1} max={30} />
        </div>
        <Button classes="button-contained" children="Ara" isLoading={loading} />
      </FormProvider>
      <FilteredCard handleClickToCenter={handleClickToCenter} />
    </div>
  );
};

export default FilterForm;
