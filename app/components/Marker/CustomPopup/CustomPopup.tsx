import { TooltipData } from "@/app/types";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

import { checkPlugsType, getPlugData, handleClickProvider } from "@/app/utils/general-utils";
import "./style.scss";

export interface CustomPopupType {
  tooltipData: TooltipData;
  isForFilteredCard?: boolean;
}

const CustomPopup: FC<CustomPopupType> = ({ tooltipData }) => {
  return (
    <div className="custom-popup-container">
      <div className="custom-popup-header">
        <h5 className="custom-popup-header-title">{tooltipData?.title}</h5>
        <Link
          href={handleClickProvider(tooltipData?.provider ?? "ZES")}
          target="_blank"
          className={classNames("custom-popup-header-provider", {
            [`${tooltipData?.provider}`]: true
          })}>
          {tooltipData?.provider}
        </Link>
      </div>
      <div
        className={classNames("custom-popup-suitability", {
          "custom-popup-suitability-okay": tooltipData?.provideLiveStats,
          "custom-popup-suitability-notokay": !tooltipData?.provideLiveStats
        })}>
        <p>{tooltipData?.provideLiveStats ? "Kullanıma uygun" : "Kullanıma uygun değil"}</p>
      </div>
      <div className="custom-popup-location">
        <Icon className="custom-popup-location-icon" icon="fluent:location-12-filled" />
        <p className="custom-popup-location-text">{tooltipData?.address}</p>
      </div>

      <div className="custom-popup-button-container">
        <Link
          className="custom-popup-button-container-item custom-popup-button-container-direction"
          target="_blank"
          href={`https://www.google.com/maps?q=${tooltipData?.location?.lat},${tooltipData?.location?.lon}`}>
          Yol Tarifi
        </Link>
        <Link
          className="custom-popup-button-container-item custom-popup-button-container-payment"
          target="_blank"
          href={handleClickProvider(tooltipData?.provider ?? "ZES")}>
          Şirket Bilgisi
        </Link>
      </div>

      <div className="custom-popup-socket">
        <div className="custom-popup-socket-container">
          <p
            className={classNames("custom-popup-socket-container-icon", {
              "custom-popup-socket-container-icon-okay": checkPlugsType(tooltipData, "AC")
            })}>
            AC
          </p>
          {checkPlugsType(tooltipData, "AC") ? (
            <>
              <p>{getPlugData(tooltipData, "AC", "count")} adet /</p>
              <p>{getPlugData(tooltipData, "AC", "power")}</p>{" "}
            </>
          ) : (
            <p>Mevcut değil</p>
          )}
        </div>
        <div className="custom-popup-socket-container">
          <p
            className={classNames("custom-popup-socket-container-icon", {
              "custom-popup-socket-container-icon-okay": checkPlugsType(tooltipData, "DC")
            })}>
            DC
          </p>
          {checkPlugsType(tooltipData, "DC") ? (
            <>
              <p>{getPlugData(tooltipData, "DC", "count")} adet /</p>
              <p>{getPlugData(tooltipData, "DC", "power")}</p>{" "}
            </>
          ) : (
            <p>Mevcut değil</p>
          )}
        </div>

        <div className="custom-popup-socket-container">
          <Icon icon="ph:clock-bold" className="custom-popup-socket-container-clock" />
          <p>00:00 - 23.59</p>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
