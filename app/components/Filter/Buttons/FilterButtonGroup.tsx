import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import { useState } from "react";
import BottomSheet from "../../BottomSheet/BottomSheet";
import FilterButton from "./FilterButton";

import "./styles.scss";

const FilterButtonGroup = () => {
  const mdUp = useResponsive("up", "md");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <div className={classNames("filter", { "filter-responsive": !mdUp })}>
      <FilterButton
        classes="filter-button-contained"
        label="Filtrele"
        onClick={() => setIsBottomSheetOpen(true)}
      />
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <div>hello</div>
      </BottomSheet>
    </div>
  );
};

export default FilterButtonGroup;
