"use client";
import { LatLngTuple } from "leaflet";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useMapGeographyStore } from "../stores/mapGeographyStore";

function useUserLocation() {
  const [location, setLocation] = useState<LatLngTuple | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const { actions } = useMapGeographyStore();
  const {
    actions: { setZoom }
  } = useMapGeographyStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setZoom(14);
          actions.setLocation([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          setError(`Konum bilgisi alınırken hata oluştu: ${error.message}`);
          setLoading(false);
          enqueueSnackbar("Konum bilgisi alınamadı!", { variant: "error" });
          console.error(`Konum bilgisi alınırken hata oluştun: ${error.message}`);
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: Infinity }
      );
    } else {
      setError("Konum bilgisi bu tarayıcıda kullanılamamaktadır!");
      setLoading(false);
      enqueueSnackbar("Konum bilgisi bu tarayıcıda kullanılamamaktadır!", { variant: "error" });
    }
  }, []);

  return { location, error, loading };
}

export default useUserLocation;
