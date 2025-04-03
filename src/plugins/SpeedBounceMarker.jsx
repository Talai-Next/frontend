import MarkerPlugin from "./MarkerPlugin";
import { usePlugins } from "../core/PluginManager";
import { useEffect } from "react";

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

export const RegisterSpeedBouncePlugin = ({ isVisible }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "SpeedBounceMarker", component: <SpeedBounceMarker /> });
    } else {
      unregisterPlugin("SpeedBounceMarker");
    }
    
    return () => unregisterPlugin("SpeedBounceMarker");
  }, [isVisible]);

  return null;
};