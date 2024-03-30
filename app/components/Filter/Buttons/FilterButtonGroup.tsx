import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import FilterButton from "./FilterButton";

import { generalStore } from "@/app/stores/generalStore";
import "./styles.scss";

const FilterButtonGroup = () => {
  const mdUp = useResponsive("up", "md");
  const { actions } = generalStore();

  return (
    <div className={classNames("filter", { "filter-responsive": !mdUp })}>
      <FilterButton
        classes="filter-button-contained"
        label="Filtrele"
        onClick={() => actions.setBottomSheetOpen(true)}
      />
    </div>
  );
};

export default FilterButtonGroup;
