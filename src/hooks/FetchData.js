import { useState, useEffect } from "react";
import api from "../api";
import { useSearchParams, useNavigate } from "react-router-dom";

function useFetchData() {
  const [searchParams] = useSearchParams();
  const [stationData, setStationData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line5, setLine5] = useState([]);
  const [lineSpecail, setLineSpecail] = useState([]);
  const [availableLine, setAvailableLine] = useState([]);
  const [loading, setLoading] = useState(true);

  // retrieve search params
  const encodedCur = searchParams.get('cur') || null;
  const cur = encodedCur ? atob(encodedCur) : null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/bus-stop-location/");
        const response1 = await api.get("/api/line-one/");
        const response3 = await api.get("/api/line-three/")
        const response5 = await api.get("/api/line-five/")
        const responseSpecial = await api.get("/api/line-special/");
        const responseAvailable = await api.get(`/api/available-line/?cur=${cur}`)
        
        setStationData(response.data || []);
        setLine1(response1.data || []);
        setLine3(response3.data || []);
        setLine5(response5.data || []);
        setLineSpecail(responseSpecial.data || []);
        setAvailableLine(responseAvailable.data || [])
      } catch (error) {
        alert(error + "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  return { stationData, line1, line3, line5, lineSpecail, availableLine, loading };
}

export default useFetchData;
