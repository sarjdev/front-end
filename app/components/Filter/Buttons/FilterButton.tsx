import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import { FC } from "react";

import { Icon } from "@iconify-icon/react/dist/iconify.js";
import "./styles.scss";

type FilterButtonType = {
  classes?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  label: string;
};

const FilterButton: FC<FilterButtonType> = ({ classes, onClick, label, isLoading = false }) => {
  const mdUp = useResponsive("up", "md");
  return (
    <button
      type="submit"
      className={classNames("filter-button", {
        "filter-button-web": mdUp,
        [`${classes}`]: classes
      })}
      onClick={() => onClick?.()}
      disabled={isLoading}>
      {isLoading ? <Icon icon="eos-icons:loading" /> : label}
    </button>
  );
};

export default FilterButton;
