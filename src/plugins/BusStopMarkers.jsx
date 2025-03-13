import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";

const BusStopMarker = () => {
  return (
    <MarkerPlugin
      apiUrl="/api/bus-stop-location/"
      iconUrl="https://cdn-icons-png.flaticon.com/256/7561/7561230.png"
      iconSize={[35, 35]}
      iconAnchor={[17, 30]}
      popupAnchor={[0, -32]}
    />
  );
};

export default BusStopMarker;

export const RegisterBusStopPlugin = ({ isVisible }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "BusStopMarker", component: <BusStopMarker /> });
    } else {
      unregisterPlugin("BusStopMarker");
    }
    
    return () => unregisterPlugin("BusStopMarker");
  }, [isVisible]);

  return null;
};