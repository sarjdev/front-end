import { useState, useEffect } from "react";

function useUserLocation() {
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);
            setLoading(false);
        }, (err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    return { location, error, loading };
}

export default useUserLocation;