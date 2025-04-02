import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";

const BusStopMarker = ({ selectLine }) => {
  return (
    <MarkerPlugin
      apiUrl="/api/bus-stop-location/"
      iconUrl="https://cdn-icons-png.flaticon.com/256/7561/7561230.png"
      iconSize={[35, 35]}
      iconAnchor={[17, 30]}
      popupAnchor={[0, -32]}
      selectLine={selectLine || undefined}
    />
  );
};

export default BusStopMarker;

export const RegisterBusStopPlugin = ({ isVisible, selectLine }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "BusStopMarker", component: <BusStopMarker selectLine={selectLine || undefined} /> });
    } else {
      unregisterPlugin("BusStopMarker");
    }
    
    return () => unregisterPlugin("BusStopMarker");
  }, [isVisible, selectLine]);

  return null;
};