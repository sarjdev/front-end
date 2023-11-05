import React from "react";
import { CustomPopupType } from "@/app/types";
import Link from "next/link";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import classNames from "classnames";
import "./style.scss";

const CustomPopup = ({
  tooltipData,
  checkPlugsType,
  getPlugData,
  handleClickProvider
}: CustomPopupType) => {
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
              "custom-popup-socket-container-icon-okay": checkPlugsType("AC")
            })}>
            AC
          </p>
          {checkPlugsType("AC") ? (
            <>
              <p>{getPlugData("AC", "count")} adet /</p>
              <p>{getPlugData("AC", "power")}</p>{" "}
            </>
          ) : (
            <p>Mevcut değil</p>
          )}
        </div>
        <div className="custom-popup-socket-container">
          <p
            className={classNames("custom-popup-socket-container-icon", {
              "custom-popup-socket-container-icon-okay": checkPlugsType("DC")
            })}>
            DC
          </p>
          {checkPlugsType("DC") ? (
            <>
              <p>{getPlugData("DC", "count")} adet /</p>
              <p>{getPlugData("DC", "power")}</p>{" "}
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
