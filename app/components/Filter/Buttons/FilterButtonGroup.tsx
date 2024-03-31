import { useResponsive } from "@/app/hooks/useResponsive";
import useUserLocation from "@/app/hooks/useUserLocation";
import { generalStore } from "@/app/stores/generalStore";
import classNames from "classnames";
import { useSnackbar } from "notistack";
import { FC } from "react";
import FilterButton from "./FilterButton";

import "./styles.scss";

const FilterButtonGroup: FC = () => {
  const mdUp = useResponsive("up", "md");
  const { actions } = generalStore();
  const { location } = useUserLocation();
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
    <div className={classNames("filter", { "filter-responsive": !mdUp })}>
      <FilterButton
        classes="filter-button-contained"
        label="Filtrele"
        onClick={handleClickFilterButton}
      />
    </div>
  );
};

export default FilterButtonGroup;
