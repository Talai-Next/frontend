import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import { useEffect } from "react";

const BusStopMarker = ({ selectLine }) => {
  return (
    <MarkerPlugin
      apiUrl="/api/bus-stop-location/"
      iconUrl="/marker/blue-bus-stop.png"
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