"use client";

import { Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { LatLngExpression } from "leaflet";
import markerIconPng from "@/app/assets/images/marker.png";
import meIcon from "@/app/assets/images/me.svg";
import msIcon from "@/app/assets/images/ms.svg";
import mzIcon from "@/app/assets/images/mz.svg";
import maIcon from "@/app/assets/images/ma.svg";
import { useState } from "react";
import { PlugType, Providers, ProvidersEnum, TooltipData } from "@/app/types";
import { Icon } from "@iconify-icon/react";

import "./style.scss";
import { useGetCertaionLocation } from "./actions";
import classNames from "classnames";

interface MarkerProps {
  position: LatLngExpression;
  icon?: Providers;
  chargingStationId: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({ position, icon, chargingStationId }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  const getLocationDetail = useGetCertaionLocation({
    chargingStationId: chargingStationId.replace("#", "%23")
  });

  const handleMarkerClick = async () => {
    try {
      const { data } = await getLocationDetail.refetch();

      setTooltipData(data ? { ...data, provideLiveStats: true } : null);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const renderIcon = (icon?: Providers) => {
    if (icon) {
      switch (icon) {
        case ProvidersEnum.ESARJ:
          return meIcon.src;
        case ProvidersEnum.SHARZ:
          return msIcon.src;
        case ProvidersEnum.ZES:
          return mzIcon.src;
        case ProvidersEnum.AKSAENERGY:
          return maIcon.src;
        default:
          return markerIconPng.src;
      }
    } else {
      return markerIconPng.src;
    }
  };

  const markerIcon = new Leaflet.Icon({
    iconUrl: renderIcon(icon) || markerIconPng.src,
    iconRetinaUrl: renderIcon(icon) || markerIconPng.src,
    iconSize: [48, 48],
    iconAnchor: [14, 14],
    className: "custom-icon"
  });

  const checkPlugsType = (type: PlugType): boolean => {
    return tooltipData?.plugs?.some((plug) => plug.type === type) ?? false;
  };

  const getPlugData = (type: PlugType, data: "count" | "power"): string | number => {
    return tooltipData?.plugs?.filter((plug) => plug.type === type)?.[0]?.[data] ?? "";
  };

  return (
    <Marker
      position={position}
      icon={markerIcon}
      eventHandlers={{
        click: handleMarkerClick
      }}>
      {tooltipData ? (
        <Popup className="custom-popup">
          <div className="custom-popup-container">
            <div className="custom-popup-header">
              <h5 className="custom-popup-header-title">{tooltipData?.title}</h5>
              <a
                href="#"
                className={classNames("custom-popup-header-provider", {
                  [`${tooltipData?.provider}`]: true
                })}>
                {tooltipData?.provider}
              </a>
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
            </div>
            <button className="custom-popup-button custom-popup-direction">Yol Tarifi Al</button>
            <button className="custom-popup-button custom-popup-payment">
              Online Ödeme Bilgisi
            </button>
          </div>
        </Popup>
      ) : (
        <Popup className="custom-popup">
          <div>Loading...</div>
        </Popup>
      )}
    </Marker>
  );
};

export default MarkerComponent;
