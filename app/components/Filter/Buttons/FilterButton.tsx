import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import { FC } from "react";

import "./styles.scss";

type FilterButtonType = {
  classes?: string;
  onClick: VoidFunction;
  label: string;
};

const FilterButton: FC<FilterButtonType> = ({ classes, onClick, label }) => {
  const mdUp = useResponsive("up", "md");
  return (
    <button
      className={classNames("filter-button", {
        "filter-button-web": mdUp,
        [`${classes}`]: classes
      })}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default FilterButton;
