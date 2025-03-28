import api from "../api";
import { useState, useEffect, useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 

export default function useNearestStation() {
    const [searchParams] = useSearchParams();
    const encodedDes = searchParams.get('des') || null;
    const des = encodedDes ? atob(encodedDes) : null
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
        if (!coord) return; 
        try {
            const response = await api.get(
                `/api/search/search-nearby-station/?lat=${coord.latitude}&lon=${coord.longitude}${des ? `&des_id=${des}` : ''}`
            );
            setNearestStation(response.data); 
        } catch (error) {
            alert("Failed to fetch data:", error);
        }
    }, [coord, searchParams]);

    useEffect(()=>{
        fetchNearestStation();
    }, [fetchNearestStation]);
    return { nearestStation, fetchNearestStation };
}
