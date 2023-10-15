import { memo, ReactNode } from "react";
import * as ReactLeaflet from "react-leaflet";
import "./styles.scss";

interface MapProps {
  className?: string;
  children: ReactNode;
}

const Map = ({ children, className, ...rest }: MapProps) => {
  return (
    <ReactLeaflet.MapContainer className="map" {...rest}>
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default memo(Map);
