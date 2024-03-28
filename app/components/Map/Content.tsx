"use client";
import { useMapEvents } from "@/app/hooks/useMapEvents";
import useUserLocation from "@/app/hooks/useUserLocation";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import { LocationResponse } from "@/app/types";
import { latLng, latLngBounds } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { TileLayer } from "react-leaflet";
import { Cluster } from "../Cluster/Cluster";
import Loading from "../Loading/Loading";
import SearchBar from "../Search/SearchBar";
import { useGetLocations } from "./actions";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("./Map"), {
  ssr: false
});

const MapEvents = () => {
  useMapEvents();
  return null;
};

const MapContent = () => {
  const [data, setData] = useState<LocationResponse[] | null>(null);
  const { zoom } = useMapGeographyStore();
  const locationData = useGetLocations();
  const { location: userLocation, loading } = useUserLocation();

  const mapBoundaries = {
    southWest: latLng(36.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563)
  };
  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);

  useEffect(() => {
    if (locationData.isSuccess) {
      setData(locationData?.data?.chargingStations);
    }
  }, [locationData.isSuccess]);

  if (locationData?.isFetching || locationData?.isRefetching || loading) {
    return <Loading />;
  }

  const dpr = window.devicePixelRatio;
  const baseMapUrl = `https://mt0.google.com/vt/scale=${dpr}&hl=en&x={x}&y={y}&z={z}`;

  const locationCenter = userLocation || [39.929311, 34.405679];

  return (
    <>
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
        <SearchBar />
      </Map>
    </>
  );
};

export default MapContent;
