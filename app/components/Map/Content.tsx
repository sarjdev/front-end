
"use client"
import { TileLayer } from "react-leaflet";
import { latLng, latLngBounds } from "leaflet";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
});

const MapContent = () => {
  const mapBoundaries = {
    southWest: latLng(34.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563),
  };

  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);
  let dpr = 1;

  if (typeof window !== "undefined") {
    dpr = window.devicePixelRatio;
 }
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=m&scale=${dpr}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

  return (
      <Map
        zoomControl={false}
        attributionControl={false}
        center={[51.505, -0.09]}
        zoom={8}
        minZoom={7}
        zoomSnap={1}
        zoomDelta={1}
        whenReady={(map: any) => {
          setTimeout(() => {
            map.target.invalidateSize();
          }, 100);
        }}
        preferCanvas
        maxBoundsViscosity={1}
        maxBounds={bounds}
        maxZoom={18}
      >
        <TileLayer url={baseMapUrl} className="w-100 h-100" />
      </Map>
  );
};

export default MapContent