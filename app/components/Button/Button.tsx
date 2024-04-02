import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import "./styles.scss";

type ButtonType = {
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined";
  classes?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  children?: ReactNode;
};

const Button: FC<ButtonType> = ({
  variant,
  classes,
  isLoading,
  children,
  type = "submit",
  onClick
}) => {
  return (
    <button
      type={type}
      className={classNames("button", {
        [`button-${variant}`]: variant,
        [`${classes}`]: classes
      })}
      onClick={() => onClick?.()}
      disabled={isLoading}>
      {isLoading ? <Icon icon="eos-icons:loading" /> : children}
    </button>
  );
};

export default Button;
