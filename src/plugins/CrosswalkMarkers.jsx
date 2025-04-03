import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import { useEffect } from "react";

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

export const RegisterCrosswalkPlugin = ({ isVisible }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "CrosswalkMarker", component: <CrosswalkMarker /> });
    } else {
      unregisterPlugin("CrosswalkMarker");
    }
    
    return () => unregisterPlugin("CrosswalkMarker");
  }, [isVisible]);

  return null;
};