"use client";
import { TileLayer } from "react-leaflet";
import { latLng, latLngBounds } from "leaflet";
import dynamic from "next/dynamic";
import MarkerComponent from "../Marker/MarkerComponent";
import { useEffect, useState } from "react";
import { useGetLocations } from "./actions";
import { LocationResponse } from "@/app/types";
import useUserLocation from "@/app/hooks/useUserLocation";
import Loading from "../Loading/Loading";
import { Cluster } from "../Cluster/Cluster";
import { ClusterStyle } from "../Cluster/ClusterStyle";
import { useMapEvents } from "@/app/hooks/useMapEvents";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";

const Map = dynamic(() => import("./Map"), {
  ssr: false
});

const MapEvents = () => {
  useMapEvents();
  return null;
};

const MapContent = () => {
  const [data, setData] = useState<LocationResponse[] | null>(null);
  const mapBoundaries = {
    southWest: latLng(34.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563)
  };
  const { coordinates, zoom, actions } = useMapGeographyStore();

  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);
  let dpr = 1;

  if (typeof window !== "undefined") {
    dpr = window.devicePixelRatio;
  }
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=m&scale=${dpr}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

  const locationData = useGetLocations();
  const { location: userLocation, loading } = useUserLocation();

  useEffect(() => {
    if (locationData.isSuccess) {
      setData(locationData?.data?.chargingStations);
    }
  }, [locationData.isSuccess]);

  useEffect(() => {
    if (userLocation && userLocation?.length) {
      actions.setCoordinates({lat: userLocation[0], lon: userLocation[1]});
    }
  }, [userLocation])

  if (locationData?.isFetching || locationData?.isRefetching || loading) {
    return <Loading />;
  }

  const locationCenter = userLocation || [51.505, -0.09];

  return (
    <>
      <ClusterStyle />
      <Map
        zoomControl={false}
        attributionControl={false}
        center={locationCenter}
        zoom={zoom}
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
        maxZoom={18}>
        <MapEvents />
        <TileLayer url={baseMapUrl} className="w-100 h-100" />
        <Cluster data={data} />
      </Map>
    </>
  );
};

export default MapContent;
