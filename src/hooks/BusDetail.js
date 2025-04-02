import { useState, useEffect } from "react";
import api from "../api";

function useBusDetailData() {
  const [bus1, setBus1] = useState([]);
  const [bus3, setBus3] = useState([]);
  const [bus5, setBus5] = useState([]);
  const [busS, setBusS] = useState([]);
  const [time1, setTime1] = useState([]);
  const [time3, setTime3] = useState([]);
  const [time5, setTime5] = useState([]);
  const [timeS, setTimeS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBus = await api.get("/api/detail/bus/");
        const responseTime = await api.get("/api/detail/time/");
        const buses = responseBus.data;
        const times = responseTime.data;

        setBus1(buses.filter((bus) => bus.line === "1"));
        setBus3(buses.filter((bus) => bus.line === "3"));
        setBus5(buses.filter((bus) => bus.line === "5"));
        setBusS(buses.filter((bus) => bus.line === "SP"));
        setTime1(times.find((time) => time.line === "1"));
        setTime3(times.find((time) => time.line === "3"));
        setTime5(times.find((time) => time.line === "5"));
        setTimeS(times.find((time) => time.line === "SP"));
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData(); // Initial fetch

    // Polling every 5 seconds to keep data updated
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return { bus1, bus3, bus5, busS, time1, time3, time5, timeS };
}

export default useBusDetailData;
