import { useMapEvents as useLeafletMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";
import { useMapGeographyStore } from "../stores/mapGeographyStore";

export const useMapEvents = () => {
  const { actions } = useMapGeographyStore();

  const debouncedZoom = useDebouncedCallback(() => {
    const zoom = map.getZoom();
    actions.setZoom(zoom);
  }, 100);

  const map = useLeafletMapEvents({
    moveend: () => {
      debouncedZoom();
    },
    zoomend: () => {
      debouncedZoom();
    }
  });

  return map;
};
