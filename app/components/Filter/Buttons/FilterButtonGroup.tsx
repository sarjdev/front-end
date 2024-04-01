import { generalStore } from "@/app/stores/generalStore";
import { useSnackbar } from "notistack";
import { FC } from "react";
import FilterButton from "./FilterButton";

import "./styles.scss";

const FilterButtonGroup: FC = () => {
  const { location, actions } = generalStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickFilterButton = () => {
    if (location) {
      actions.setBottomSheetOpen(true);
    } else {
      enqueueSnackbar("Filtreleme yapabilmek için konum erişimine izin vermeniz gerekmektedir!", {
        variant: "warning"
      });
    }
  };

  return (
    <div className="filter">
      <FilterButton
        classes="filter-button-contained"
        label="Filtrele"
        onClick={handleClickFilterButton}
      />
    </div>
  );
};

export default FilterButtonGroup;
