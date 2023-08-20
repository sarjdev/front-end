
"use client"
import Leaflet from "leaflet"
import { memo, ReactNode, useEffect } from "react";
import * as ReactLeaflet from "react-leaflet";
import "./styles.scss"

interface MapProps {
  className?: string;
  children: ReactNode;
}

const Map = ({ children, className, ...rest }: MapProps) => {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      (async function init() {
          // @ts-ignore
          delete Leaflet.Icon.Default.prototype._getIconUrl;
          Leaflet.Icon.Default.mergeOptions({
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            iconRetinaUrl: "/images/icon-generic.png",
            iconUrl: "/images/icon-generic.png",
            shadowUrl: "",
          });
      })();
    }
  }, []);

  return (
    <ReactLeaflet.MapContainer className="map"  {...rest}>
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default memo(Map);