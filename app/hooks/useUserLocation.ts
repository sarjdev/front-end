"use client";
import { useState, useEffect } from "react";

function useUserLocation() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
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
          console.error(err.message);
          setLoading(false);
        },
        {
          timeout: 1000
        }
      );
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);

  return { location, error, loading };
}

export default useUserLocation;
