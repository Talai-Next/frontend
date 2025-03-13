import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import React, { useEffect } from "react";

const CrosswalkMarker = () => {
  return (
    <MarkerPlugin
      apiUrl="/api/obstacle-marker/1/"
      iconUrl="https://cdn-icons-png.flaticon.com/128/10981/10981039.png"
      iconSize={[30, 30]}
      iconAnchor={[11, 30]}
    />
  );
};

export default CrosswalkMarker;

export const RegisterCrosswalkPlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({ name: "CrosswalkMarker", component: <CrosswalkMarker /> });
  }, []);

  return null;
};