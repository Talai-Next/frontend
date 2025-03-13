"use client";
import "../index.css";
import LineCardInfo from "../components/LineCardInfo";
import { useState, useEffect } from "react";
import KasetsartMap from "../components/KasetsartMap";
import api from "../api";
import { RegisterBusStopPlugin } from "../plugins/BusStopMarkers";
import { PluginProvider } from "../core/PluginManager";
import { RegisterCrosswalkPlugin } from "../plugins/CrosswalkMarkers";
import { RegisterSpeedBouncePlugin } from "../plugins/SpeedBounceMarker";
import MarkerSetting from "../components/MarkerSetting";

function Home() {
  const [showBusstop, setShowBusstop] = useState(true);
  const [showCrosswalk, setShowCrosswalk] = useState(false);
  const [showSpeedBump, setShowSpeedBump] = useState(false);

  const [line1, setLine1] = useState([]);
  const [lineSpecail, setLineSpecail] = useState([]);

  const fetchData = async () => {
    try {
      const response1 = await api.get("/api/line-one/");
      const responseSpecial = await api.get("/api/line-special/");
      setLine1(response1.data || []);
      setLineSpecail(responseSpecial.data || []);
    } catch (error) {
      alert(error + " Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <PluginProvider>
        <RegisterBusStopPlugin isVisible={showBusstop} />
        <RegisterCrosswalkPlugin isVisible={showCrosswalk} />
        <RegisterSpeedBouncePlugin isVisible={showSpeedBump} />
        <div className="h-[60vh]">
          <KasetsartMap />
        </div>
      </PluginProvider>

      <div className="flex flex-col md:flex-row w-full p-5 gap-6">
        <div className="flex-1 space-y-4 py-10">
          <LineCardInfo line="1" data={line1} />
          <LineCardInfo line="พิเศษ" data={lineSpecail} />
        </div>

        <div className="w-full md:w-[400px]">
          <MarkerSetting
            showBusstop={showBusstop}
            showCrosswalk={showCrosswalk}
            showSpeedBump={showSpeedBump}
            setShowBusstop={setShowBusstop}
            setShowCrosswalk={setShowCrosswalk}
            setShowSpeedBump={setShowSpeedBump}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
