import classNames from "classnames";
import React from "react";
import "./styles.scss";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={classNames("bottomSheet", { open: isOpen })}>
      <div className={classNames({ overlay: isOpen })} onClick={onClose}></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default BottomSheet;
