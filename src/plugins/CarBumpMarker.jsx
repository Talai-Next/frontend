import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";

const CarBumpMarker = () => {
  return (
    <MarkerPlugin
      apiUrl="/api/obstacle-marker/2/"
      iconUrl="https://cdn-icons-png.flaticon.com/128/15584/15584667.png"
      iconSize={[30, 30]}
      iconAnchor={[11, 30]}
    />
  );
};

export default CarBumpMarker;

export const RegisterCarBumpPlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({ name: "CarBumpMarker", component: <CarBumpMarker /> });
  }, [registerPlugin]);

  return null;
};