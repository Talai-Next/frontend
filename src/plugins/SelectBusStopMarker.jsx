import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const SelectBusStopMarker = () => {
  const [searchParams] = useSearchParams();
  const curParams = searchParams.get('cur');
  const curId = curParams ? atob(curParams) : null;
  const desParams = searchParams.get('des');
  const desId = desParams ? atob(desParams) : null;

  if (!curId || !desId) return null;

  return (
        <MarkerPlugin
        apiUrl={`/api/select-station?cur=${curId}&${desId}/`}
        iconUrl="https://cdn-icons-png.flaticon.com/256/7561/7561230.png"
        iconSize={[35, 35]}
        iconAnchor={[17, 30]}
        popupAnchor={[0, -32]}
    />   
  );
};

export default SelectBusStopMarker;

export const RegisterBusStopPlugin = ({ isVisible }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "SelectBusStopMarker", component: <SelectBusStoparker /> });
    } else {
      unregisterPlugin("SelectBusStopMarker");
    }
    
    return () => unregisterPlugin("SelectBusStopMarker");
  }, [isVisible]);

  return null;
};