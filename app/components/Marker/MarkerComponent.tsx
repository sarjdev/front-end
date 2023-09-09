"use client";

import { Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import { LatLngExpression } from "leaflet";
import markerIconPng from "@/app/assets/images/marker.png";
import meIcon from "@/app/assets/images/me.svg";
import msIcon from "@/app/assets/images/ms.svg";
import mzIcon from "@/app/assets/images/mz.svg";

interface MarkerProps {
  position: LatLngExpression;
  popupContent?: string;
  icon?: "ESARJ" | "ZES" | "SHARZ";
}

const MarkerComponent: React.FC<MarkerProps> = ({ position, popupContent, icon }) => {
  const renderIcon = (icon?: "ESARJ" | "ZES" | "SHARZ") => {
    if (icon) {
      switch (icon) {
        case "ESARJ":
          return meIcon.src;
        case "SHARZ":
          return msIcon.src;
        case "ZES":
          return mzIcon.src;
        default:
          return meIcon.src;
      }
    } else {
      return markerIconPng.src;
    }
  };
  const markerIcon = new Leaflet.Icon({
    iconUrl: renderIcon(icon) || markerIconPng.src,
    iconRetinaUrl: renderIcon(icon) || markerIconPng.src,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null
  });

  return (
    <Marker position={position} icon={markerIcon}>
      {popupContent && <Popup>{popupContent}</Popup>}
    </Marker>
  );
};

export default MarkerComponent;
