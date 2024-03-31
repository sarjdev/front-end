"use client";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

function useUserLocation() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!navigator.geolocation) {
      enqueueSnackbar("Konum bilgisi bu tarayıcıda kullanılamıyor!", { variant: "error" });
      setLoading(false);
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
          enqueueSnackbar("Konum bilgisi alınamadı!", { variant: "error" });
          return;
        },
        {
          timeout: 5000
        }
      );
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Konum bilgisi alınamadı!", { variant: "error" });
    }
  }, []);

  return { location, error, loading };
}

export default useUserLocation;
