"use client";
import "../styles/home.css";
import LineCardInfo from "../components/LineCardInfo";
import { useState, useEffect } from "react";
import KasetsartMap from "../components/KasetsartMap";
import api from "../api";
import { RegisterBusStopPlugin } from "../plugins/BusStopMarkers";
import { PluginProvider } from "../core/PluginManager";
import { RegisterCrosswalkPlugin } from "../plugins/CrosswalkMarkers";
import { RegisterCarBumpPlugin } from "../plugins/CarBumpMarker";

function Home() {
  const [line1, setLine1] = useState([]);
  const [lineSpecail, setLineSpecail] = useState([]);

  const fetchData = async () => {
    try {
      const response1 = await api.get("/api/line-one/");
      const responseSpecial = await api.get("/api/line-special/");
      setLine1(response1.data || []);
      setLineSpecail(responseSpecial.data || []);
    } catch (error) {
      alert(error + "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-screen">
      {/* <Header /> */}
      <PluginProvider>
        <RegisterBusStopPlugin />
        <RegisterCrosswalkPlugin />
        <RegisterCarBumpPlugin />
        <KasetsartMap />
      </PluginProvider>
      <div className="px-5 py-2">
        <LineCardInfo line="1" data={line1} />
        <LineCardInfo line="พิเศษ" data={lineSpecail} />
      </div>
    </div>
  );
}

export default Home;
