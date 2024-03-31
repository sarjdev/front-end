import { useResponsive } from "@/app/hooks/useResponsive";
import { FilterFormSchema } from "@/app/schema/filterFormSchema";
import { generalStore } from "@/app/stores/generalStore";
import { Location } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { FC } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../../Form/FormProvider/FormProvider";
import RangeInput from "../../Form/RangeInput/RangeInput";
import FilterButton from "../Buttons/FilterButton";
import FilteredCard from "../FilteredCard/FilteredCard";
import { useGetFilteredData } from "./actions";

import "./styles.scss";

type FilteredCardType = {
  handleClickToCenter: (location: Location) => void;
};

const FilterForm: FC<FilteredCardType> = ({ handleClickToCenter }) => {
  const mdUp = useResponsive("up", "md");
  const methods = useForm({
    resolver: yupResolver(FilterFormSchema),
    defaultValues: {
      distance: 10,
      size: 10
    }
  });
  const { actions } = generalStore();

  const { watch, handleSubmit } = methods;

  const values = watch();

  const filterData = useGetFilteredData();

  const onSubmit = handleSubmit(async (data) => {
    try {
      filterData.mutate(
        {
          longitude: 29.848306,
          latitude: 40.904722,
          distance: data.distance,
          size: data.size
        },
        {
          onSuccess: (data) => {
            actions.setFilteredLocationData(data.data);
          },
          onError: (error) => {
            console.warn(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className={classNames("filter-section", { "filter-section-responsive": !mdUp })}>
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
        className={classNames("filter-section-form", {
          "filter-section-form-responsive": !mdUp
        })}>
        <h3>Filtrele</h3>
        <div>
          <span>Mesafe {`(${values.distance} km)`}</span>
          <RangeInput name="distance" min={1} max={20} />
        </div>
        <div>
          <span>Adet {`(${values.size})`}</span>
          <RangeInput name="size" min={1} max={30} />
        </div>
        <FilterButton classes="filter-button-contained" label="Ara" />
      </FormProvider>
      <FilteredCard handleClickToCenter={handleClickToCenter} />
    </div>
  );
};

export default FilterForm;
