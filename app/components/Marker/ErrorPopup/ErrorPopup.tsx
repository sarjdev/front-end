import { Icon } from "@iconify-icon/react/dist/iconify.js";
import Link from "next/link";
import { FC } from "react";

import "./style.scss";

export interface ErrorPopupType {
  locationLink: string;
}

const ErrorPopup: FC<ErrorPopupType> = ({ locationLink }) => {
  return (
    <div className="error-popup">
      <Icon icon="ic:baseline-error" className="error-popup-icon" />
      <p>Şarj istasyonu verisi çekilirken bir sorun yaşandı!</p>
      <Link href={locationLink} target="_blank" className="error-popup-link">
        Harita'da aç
      </Link>
    </div>
  );
};

export default ErrorPopup;
