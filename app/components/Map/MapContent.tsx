"use client";
import { useMapEvents } from "@/app/hooks/useMapEvents";
import useUserLocation from "@/app/hooks/useUserLocation";
import { useGeneralStore } from "@/app/stores/generalStore";
import { useMapGeographyStore } from "@/app/stores/mapGeographyStore";
import { FilteredLocationData, Location } from "@/app/types";
import { UserLocationMarker } from "@/app/utils/general-utils";
import classNames from "classnames";
import Leaflet, { LatLng, LatLngBounds, LatLngTuple } from "leaflet";
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
import CustomPopup from "../Marker/CustomPopup/CustomPopup";
import LoadingPopup from "../Marker/LoadingPopup/LoadingPopup";
import "./styles.scss";

const MapEvents = () => {
  useMapEvents();
  return null;
};

const MapContent: FC = () => {
  const { zoom } = useMapGeographyStore();
  const locationData = useGetLocations();
  const { location: userLocation, loading } = useUserLocation();
  const { isBottomSheetOpen, isMarkerBottomSheetOpen, markerBottomSheetData, actions } =
    useGeneralStore();
  const mapRef = useRef<any>(null);

  const mapBoundaries = new LatLngBounds(new LatLng(30.0, 25.0), new LatLng(44.0, 45.0));

  const additionalBounds = [
    new LatLng(35.0, 32.0),
    new LatLng(35.0, 38.0),
    new LatLng(33.0, 42.0),
    new LatLng(40.0, 45.0),
    new LatLng(42.0, 45.0),
    new LatLng(43.0, 28.0)
  ];

  additionalBounds.forEach((coord) => {
    mapBoundaries.extend(coord);
  });

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
    iconUrl: UserLocationMarker,
    iconRetinaUrl: UserLocationMarker,
    iconSize: [36, 36],
    iconAnchor: [14, 14]
  });

  return (
    <>
      <MapContainer
        className={classNames("map", { "map-not-clickable": isBottomSheetOpen })}
        zoomControl={false}
        attributionControl={false}
        center={userLocation || locationCenter}
        zoom={zoom}
        minZoom={7}
        zoomSnap={1}
        zoomDelta={1}
        ref={mapRef}
        preferCanvas
        maxBoundsViscosity={1}
        maxBounds={mapBoundaries}
        maxZoom={18}>
        <MapEvents />
        <TileLayer url={baseMapUrl} className="w-100 h-100" />
        <Cluster data={locationData?.data?.chargingStations || null} />
        {zoom >= 14 && userLocation ? (
          <Marker position={userLocation} icon={userLocationIcon} />
        ) : null}
        <SearchBar />
        <HelperButtonGroup />
      </MapContainer>
      {!isMarkerBottomSheetOpen ? (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => {
            actions.setBottomSheetOpen(false);
            actions.setFilteredLocationData({} as FilteredLocationData);
          }}>
          <FilterForm handleClickToCenter={handleClickToCenter} />
        </BottomSheet>
      ) : null}

      {!isBottomSheetOpen ? (
        <BottomSheet
          isForResponsiveMarker
          isOpen={isMarkerBottomSheetOpen}
          onClose={() => {
            actions.setMarkerBottomSheetOpen(false);
            actions.setMarkerBottomSheetData(null);
          }}>
          {markerBottomSheetData ? (
            <CustomPopup tooltipData={markerBottomSheetData} />
          ) : (
            <LoadingPopup />
          )}
        </BottomSheet>
      ) : null}
    </>
  );
};

export default MapContent;
