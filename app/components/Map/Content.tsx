"use client";
import { TileLayer } from "react-leaflet";
import { latLng, latLngBounds } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGetLocations } from "./actions";
import { LocationResponse } from "@/app/types";
import useUserLocation from "@/app/hooks/useUserLocation";
import Loading from "../Loading/Loading";
import { Cluster } from "../Cluster/Cluster";
import { useMapEvents } from "@/app/hooks/useMapEvents";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import SearchBar from "../Search/SearchBar";

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
    southWest: latLng(34.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563)
  };
  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);
  const baseMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  useEffect(() => {
    if (locationData.isSuccess) {
      setData(locationData?.data?.chargingStations);
    }
  }, [locationData.isSuccess]);

  if (locationData?.isFetching || locationData?.isRefetching || loading) {
    return <Loading />;
  }

  const locationCenter = userLocation || [51.505, -0.09];

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
        <TileLayer url={baseMapUrl} className="w-100 h-100" attribution={attribution} />
        <Cluster data={data} />
        <SearchBar />
      </Map>
    </>
  );
};

export default MapContent;
