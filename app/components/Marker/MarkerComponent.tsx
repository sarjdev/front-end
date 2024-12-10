"use client";

import defaultMarker from "@/app/assets/images/marker.svg";
import { useResponsive } from "@/app/hooks/useResponsive";
import { useGeneralStore } from "@/app/stores/generalStore";
import { SearchDetail } from "@/app/types/search-detail";
import Leaflet, { LatLngExpression } from "leaflet";
import { useSnackbar } from "notistack";
import { FC, useLayoutEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import CustomPopup from "./CustomPopup/CustomPopup";
import ErrorPopup from "./ErrorPopup/ErrorPopup";
import LoadingPopup from "./LoadingPopup/LoadingPopup";
import { renderIcon } from "./MarkerIcons";
import { useGetCertaionLocation } from "./actions";

import "./styles.scss";

interface MarkerProps {
  position: LatLngExpression;
  icon: string;
  chargingStationId: string;
}

const MarkerComponent: FC<MarkerProps> = ({ position, icon, chargingStationId }) => {
  const map = useMap();
  const [tooltipData, setTooltipData] = useState<SearchDetail | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const mdUp = useResponsive("up", "md");
  const { actions } = useGeneralStore();

  const getLocationDetail = useGetCertaionLocation({
    chargingStationId: chargingStationId
  });

  useLayoutEffect(() => {
    if (getLocationDetail.isError) {
      setTooltipData(null);
      setHasError(true);
    }
  }, [getLocationDetail.isError]);

  const handleMarkerClick = async () => {
    setTooltipData(null);
    setHasError(false);

    const newLat = (position as Leaflet.LatLngTuple)?.[0] + 0.005;

    map.flyTo([newLat, (position as Leaflet.LatLngTuple)?.[1]], 15);

    if (!mdUp) {
      actions.setMarkerBottomSheetOpen(true);
    }

    try {
      const { data } = await getLocationDetail.refetch();

      mdUp ? setTooltipData(data ?? null) : actions.setMarkerBottomSheetData(data ?? null);
    } catch (error) {
      enqueueSnackbar("Şarj istasyonu verisi çekilirken bir hata oluştu!", { variant: "error" });
    }
  };

  const markerIcon = new Leaflet.Icon({
    iconUrl: renderIcon(icon) || defaultMarker.src,
    iconRetinaUrl: renderIcon(icon) || defaultMarker.src,
    iconSize: [48, 48],
    iconAnchor: [14, 14]
  });

  return (
    <Marker
      position={position}
      icon={markerIcon}
      eventHandlers={{
        click: handleMarkerClick
      }}>
      {mdUp ? (
        tooltipData ? (
          <Popup className="popup">
            <CustomPopup tooltipData={tooltipData} />
          </Popup>
        ) : hasError ? (
          <Popup className="popup">
            <ErrorPopup locationLink={`https://www.google.com/maps?q=${position}`} />
          </Popup>
        ) : (
          <Popup className="popup">
            <LoadingPopup />
          </Popup>
        )
      ) : null}
    </Marker>
  );
};

export default MarkerComponent;
