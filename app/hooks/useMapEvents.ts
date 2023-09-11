import L from "leaflet";
import { useMapEvents as useLeafletMapEvents } from "react-leaflet";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMapGeographyStore } from "../stores/mapGeographyStore";
import { EVENT_TYPES } from "../types";
import { useMapActions } from "../stores/mapStore";

const expandCoordinatesBy = (coordinates: L.LatLngBounds, value: number) => {
  const { lat: neLat, lng: neLng } = coordinates.getNorthEast();
  const { lat: swLat, lng: swLng } = coordinates.getSouthWest();

  const northEast = L.latLng(neLat + value, neLng + value);
  const southWest = L.latLng(swLat - value, swLng - value);

  return L.latLngBounds(northEast, southWest);
};

export const useMapEvents = () => {
  const mapZoomLevelRef = useRef(0);
  const { setPopUpData, setEventType } = useMapActions();
  const { actions } = useMapGeographyStore();

  const debounced = useDebouncedCallback(
    (value: L.LatLngBounds, eventType: EVENT_TYPES) => {
      const zoom = map.getZoom();
      let localCoordinates = value;

      const shouldExpandCoordinates =
        zoom === 18 || zoom === 17 || zoom === 16 || zoom === 15;

      if (shouldExpandCoordinates) {
        localCoordinates = expandCoordinatesBy(
          localCoordinates,
          0.02
        );
      }

      setEventType(eventType);
      const { lat, lng } = localCoordinates.getCenter();

      actions.setCoordinates({ lat, lon: lng });
      actions.setZoom(zoom);
    },
    100
  );

  const map = useLeafletMapEvents({
    movestart: () => {
      setEventType("movestart");
    },
    moveend: () => {
      debounced(map.getBounds(), "moveend");
      setEventType("moveend");
    },
    zoomend: () => {
      debounced(map.getBounds(), "zoomend");
      setEventType("zoomend");

      const isZoomOut = mapZoomLevelRef.current > map.getZoom();
      if (isZoomOut) {
        setPopUpData(null);
      }
    },
    zoomstart: () => {
      setEventType("zoomstart");
      mapZoomLevelRef.current = map.getZoom();
    },
  });

  return map;
};