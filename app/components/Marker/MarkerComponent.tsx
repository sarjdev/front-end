"use client";

import maIcon from "@/app/assets/images/ma.svg";
import markerIconPng from "@/app/assets/images/marker.png";
import mbIcon from "@/app/assets/images/mb.svg";
import meIcon from "@/app/assets/images/me.svg";
import msIcon from "@/app/assets/images/ms.svg";
import mzIcon from "@/app/assets/images/mz.svg";
import { Providers, ProvidersEnum, TooltipData } from "@/app/types";
import Leaflet, { LatLngExpression } from "leaflet";
import { useLayoutEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import CustomPopup from "./CustomPopup/CustomPopup";
import ErrorPopup from "./ErrorPopup/ErrorPopup";
import LoadingPopup from "./LoadingPopup/LoadingPopup";
import { useGetCertaionLocation } from "./actions";

import "./styles.scss";

interface MarkerProps {
  position: LatLngExpression;
  icon?: Providers;
  chargingStationId: string;
}

const MarkerComponent: React.FC<MarkerProps> = ({ position, icon, chargingStationId }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const getLocationDetail = useGetCertaionLocation({
    chargingStationId: chargingStationId.replace("#", "%23")
  });

  useLayoutEffect(() => {
    if (getLocationDetail.isError) {
      setTooltipData(null);
      setHasError(true);
    }
  }, [getLocationDetail.isError]);

  const handleMarkerClick = async () => {
    setTooltipData(null);
    setHasError(false);
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
        case ProvidersEnum.BEEFULL:
          return mbIcon.src;
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

  return (
    <Marker
      position={position}
      icon={markerIcon}
      eventHandlers={{
        click: handleMarkerClick
      }}>
      {tooltipData ? (
        <Popup className="popup">
          <CustomPopup tooltipData={tooltipData} />
        </Popup>
      ) : hasError ? (
        <Popup className="popup">
          <ErrorPopup locationLink={`https://www.google.com/maps?q=${position}`} />
        </Popup>
      ) : (
        <Popup className="popup">
          <LoadingPopup />
        </Popup>
      )}
    </Marker>
  );
};

export default MarkerComponent;
