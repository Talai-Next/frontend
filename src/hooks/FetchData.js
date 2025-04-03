import { useState, useEffect } from "react";
import api from "../api";

function useFetchData() {
  const [stationData, setStationData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line5, setLine5] = useState([]);
  const [lineSpecail, setLineSpecail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/bus-stop-location/");
        const response1 = await api.get("/api/line-one/");
        const response3 = await api.get("/api/line-three/");
        const response5 = await api.get("/api/line-five/");
        const responseSpecial = await api.get("/api/line-special/");
        
        setStationData(response.data || []);
        setLine1(response1.data || []);
        setLine3(response3.data || []);
        setLine5(response5.data || []);
        setLineSpecail(responseSpecial.data || []);
      } catch (error) {
        alert(error + "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);




  return { stationData, line1, line3, line5, lineSpecail, loading };
}

export default useFetchData;
