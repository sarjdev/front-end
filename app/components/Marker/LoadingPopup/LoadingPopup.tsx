import React, { memo } from "react";
import { Popup } from "react-leaflet";
import "./style.scss";

const LoadingPopup = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingPopup;
