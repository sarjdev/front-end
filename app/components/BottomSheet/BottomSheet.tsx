import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import "./styles.scss";

interface BottomSheetModalProps {
  isOpen: boolean;
  isForResponsiveMarker?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  children,
  isForResponsiveMarker = false
}) => {
  const mdUp = useResponsive("up", "md");

  return isOpen ? (
    <div
      className={classNames("bottom-sheet", {
        "bottom-sheet-open": isOpen,
        "bottom-sheet-responsive-marker": isForResponsiveMarker
      })}>
      <div className={classNames({ "bottom-sheet-overlay": isOpen })} onClick={onClose}></div>
      <div className="bottom-sheet-content">{children}</div>
    </div>
  ) : null;
};

export default BottomSheet;
