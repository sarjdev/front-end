import { useResponsive } from "@/app/hooks/useResponsive";
import useUserLocation from "@/app/hooks/useUserLocation";
import { generalStore } from "@/app/stores/generalStore";
import classNames from "classnames";
import { FC } from "react";
import FilterButton from "./FilterButton";

import "./styles.scss";

const FilterButtonGroup: FC = () => {
  const mdUp = useResponsive("up", "md");
  const { actions } = generalStore();
  const { location } = useUserLocation();

  const handleClickFilterButton = () => {
    if (location) {
      actions.setBottomSheetOpen(true);
    } else {
      console.log("hata");
      actions.setBottomSheetOpen(true);
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
