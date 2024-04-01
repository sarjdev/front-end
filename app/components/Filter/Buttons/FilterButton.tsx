import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import { FC } from "react";

import "./styles.scss";

type FilterButtonType = {
  classes?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  label: string;
};

const FilterButton: FC<FilterButtonType> = ({ classes, onClick, label, isLoading = false }) => {
  return (
    <button
      type="submit"
      className={classNames("filter-button", {
        [`${classes}`]: classes
      })}
      onClick={() => onClick?.()}
      disabled={isLoading}>
      {isLoading ? <Icon icon="eos-icons:loading" /> : label}
    </button>
  );
};

export default FilterButton;
