import React from "react";
import "./style.scss";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

const ErrorPopup = () => {
  return (
    <div className="error-popup">
      <Icon icon="ic:baseline-error" className="error-popup-icon" />
      <p>Şarj istasyonu verisi çekilirken bir sorun yaşandı!</p>
    </div>
  );
};

export default ErrorPopup;
