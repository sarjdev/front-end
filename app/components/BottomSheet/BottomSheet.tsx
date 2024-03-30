import { useResponsive } from "@/app/hooks/useResponsive";
import classNames from "classnames";
import React from "react";
import "./styles.scss";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetModalProps> = ({ isOpen, onClose, children }) => {
  const mdUp = useResponsive("up", "md");

  return (
    <div
      className={classNames({
        "bottom-sheet": mdUp,
        "bottom-sheet-open": isOpen,
        "bottom-sheet-responsive": !mdUp
      })}>
      <div className={classNames({ "bottom-sheet-overlay": isOpen })} onClick={onClose}></div>
      <div
        className={classNames("bottom-sheet-content", {
          "bottom-sheet-content-responsive": !mdUp
        })}>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
