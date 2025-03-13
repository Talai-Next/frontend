import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";

const SpeedBounceMarker = () => {
  return (
    <MarkerPlugin
      apiUrl="/api/obstacle-marker/2/"
      iconUrl="https://cdn-icons-png.flaticon.com/128/15584/15584667.png"
      iconSize={[30, 30]}
      iconAnchor={[11, 30]}
    />
  );
};

export default SpeedBounceMarker;

export const RegisterSpeedBouncePlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({ name: "SpeedBounceMarker", component: <SpeedBounceMarker /> });
  }, []);

  return null;
};