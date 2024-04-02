"use client";
import userLocationMarker from "@/app/assets/images/user-location.png";
import { useMapEvents } from "@/app/hooks/useMapEvents";
import useUserLocation from "@/app/hooks/useUserLocation";
import { generalStore } from "@/app/stores/generalStore";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import { FilteredLocationData, Location } from "@/app/types";
import classNames from "classnames";
import Leaflet, { LatLngTuple, latLng, latLngBounds } from "leaflet";
import { FC, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import BottomSheet from "../BottomSheet/BottomSheet";
import { Cluster } from "../Cluster/Cluster";
import FilterForm from "../Filter/FilterForm/FilterForm";
import HelperButtonGroup from "../HelperButtons/HelperButtonGroup";
import Loading from "../Loading/Loading";
import SearchBar from "../Search/SearchBar";
import { useGetLocations } from "./actions";

import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet/dist/leaflet.css";
import "./styles.scss";

const MapEvents = () => {
  useMapEvents();
  return null;
};

const MapContent: FC = () => {
  const { zoom } = useMapGeographyStore();
  const locationData = useGetLocations();
  const { location: userLocation, loading } = useUserLocation();
  const { isBottomSheetOpen, actions } = generalStore();
  const mapRef = useRef<any>(null);

  const mapBoundaries = {
    southWest: latLng(36.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563)
  };
  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);

  if (locationData?.isFetching || locationData?.isRefetching || loading) {
    return <Loading />;
  }

  const dpr = window.devicePixelRatio;
  const baseMapUrl = `https://mt0.google.com/vt/scale=${dpr}&hl=en&x={x}&y={y}&z={z}`;

  const locationCenter: LatLngTuple = [39.9255, 32.8663];

  const handleClickToCenter = (location: Location) => {
    if (mapRef.current) {
      const selectedLocationData: [number, number] | undefined = location
        ? [location.lat, location.lon]
        : undefined;

      actions.setBottomSheetOpen(false);
      mapRef.current.flyTo(selectedLocationData, 17);
    }
  };

  const userLocationIcon = new Leaflet.Icon({
    iconUrl: userLocationMarker.src,
    iconRetinaUrl: userLocationMarker.src,
    iconSize: [64, 64],
    iconAnchor: [14, 14],
    className: "custom-icon"
  });

  return (
    <>
      <MapContainer
        className={classNames("map", { "map-not-clickable": isBottomSheetOpen })}
        zoomControl={false}
        attributionControl={false}
        center={locationCenter}
        zoom={zoom}
        minZoom={7}
        zoomSnap={1}
        zoomDelta={1}
        ref={mapRef}
        preferCanvas
        maxBoundsViscosity={1}
        maxBounds={bounds}
        maxZoom={18}>
        <MapEvents />
        <TileLayer url={baseMapUrl} className="w-100 h-100" />
        <Cluster data={locationData?.data?.chargingStations || null} />
        {zoom >= 12 && userLocation ? (
          <Marker position={userLocation} icon={userLocationIcon} />
        ) : null}
        <SearchBar />
        <HelperButtonGroup />
      </MapContainer>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          actions.setBottomSheetOpen(false);
          actions.setFilteredLocationData({} as FilteredLocationData);
        }}>
        <FilterForm handleClickToCenter={handleClickToCenter} />
      </BottomSheet>
    </>
  );
};

export default MapContent;
