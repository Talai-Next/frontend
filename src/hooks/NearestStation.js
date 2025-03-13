import api from "../api";
import { useState, useEffect } from "react";

export default function useNearestStation() {
    const [nearestStation, setNearestStation] = useState(null)
    const [coord, setCoord] = useState(null)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    useEffect(() => {
        if (!isGeolocationAvailable) {
            alert("Your browser does not support Geolocation");
        } else if (!isGeolocationEnabled) {
            alert("Geolocation is not enabled");
        } else if (coords) {
            setCoord(coords);
        }
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    const fetchNearestStation = useCallback(async () => {
        if (!coord) return; // ถ้าไม่มีพิกัด ไม่ต้องทำอะไร
        try {
            const response = await api.get(
                `/api/search-nearby-station/?lat=${coord.latitude}&lon=${coord.longitude}`
            );
            setNearestStation(response.data); // อัปเดต state ด้วยข้อมูลสถานีที่ใกล้ที่สุด
        } catch (error) {
            alert("Failed to fetch data:", error);
        }
    }, [coord]);

    useEffect(()=>{
        fetchNearestStation();
    }, [fetchNearestStation]);
    return { nearestStation, fetchNearesStation };
}
