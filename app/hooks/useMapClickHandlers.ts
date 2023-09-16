import { useCallback, MouseEvent, KeyboardEvent } from "react";
import { LeafletMouseEvent } from "leaflet";

import * as localForage from "localforage";
import { LocationData, LocationResponse } from "../types";
import { useMapActions } from "../stores/mapStore";
import { useMarkerActions } from "../stores/markerStore";

const localForageKeys = {
  markersVisited: "markersVisited"
} as const;

type MarkerVisited = {
  [key: string]: boolean;
};

export function useMapClickHandlers() {
  const { toggleDrawer, setDrawerData, setPopUpData } = useMapActions();
  const { setMarkerData } = useMarkerActions();

  const handleMarkerClick = useCallback(
    async (
      event: KeyboardEvent | MouseEvent | LeafletMouseEvent,
      selectedMarkerData?: LocationResponse,
      allMarkers?: LocationResponse[]
    ) => {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape") return;

      const markerVisitedMap: MarkerVisited =
        (await localForage.getItem(localForageKeys.markersVisited)) || {};

      if (allMarkers && selectedMarkerData?.id) {
        markerVisitedMap[selectedMarkerData?.id] = true;

        localForage.setItem(localForageKeys.markersVisited, markerVisitedMap);

        const changedMarkerIndex = allMarkers.findIndex(
          (marker) => marker.id === selectedMarkerData?.id
        );

        if (changedMarkerIndex !== -1) {
          const geometry = selectedMarkerData?.location;
          const reference = selectedMarkerData?.id;
          const provider = selectedMarkerData?.provider;

          const finalArr = allMarkers;
          finalArr[changedMarkerIndex] = {
            id: reference,
            location: geometry,
            provider
          };

          setMarkerData(finalArr);
        }
      }

      toggleDrawer();

      if (selectedMarkerData) {
        setDrawerData({ ...selectedMarkerData });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClusterClick = useCallback(
    (markers: LocationData[], count: number = 0) => {
      setPopUpData({
        count,
        baseMarker: markers[0],
        markers: []
      });
    },
    [setPopUpData]
  );

  return { handleMarkerClick, handleClusterClick };
}
