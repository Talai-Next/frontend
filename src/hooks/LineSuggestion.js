import api from "../api";
import { useState, useEffect, useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 

export default function useLineSuggestion() {
    const [searchParams] = useSearchParams();
    const [line, setLine] = useState("")
    
    // get destination and current station
  
    const encodedCur = searchParams.get('cur') || null;
    const cur = encodedCur ? atob(encodedCur) : null
    const encodedDes = searchParams.get('des') || null;
    const des = encodedDes ? atob(encodedDes) : null
    useEffect(() => {
        const fetchData = async () => {
          try {
            if (cur & des){
                const response = await api.get(`/api/search/bus-route?cur=${cur}&des=${des}`);
                setLine(response.data)
            }
          } catch (error) {
            alert(error + "Failed to fetch bus route data");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [encodedDes, encodedCur]);
    
    
    return { line };
}
