import api from "../api";
import { useState, useEffect, useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 

export default function useNearestStation() {
    const [searchParams] = useSearchParams();

    const encodedDes = searchParams.get('des') || null;
    const des = encodedDes ? atob(encodedDes) : null
    const encodedCur = searchParams.get('cur') || null;
    const cur = encodedDes ? atob(encodedDes) : null

    
    return { nearestStation, fetchNearestStation };
}
