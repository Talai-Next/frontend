import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import api from "../api";
import { usePlugins } from "../core/PluginManager";

const crosswalkIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/7902/7902177.png",
  iconSize: [30, 30],
  iconAnchor: [11, 30],
});

const CrosswalkMarker = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get("/api/obstacle-marker/1/")
      .then((response) => setLocations(response.data))
      .catch(() => alert("Failed to fetch bus stop locations"));
  }, []);

  return (
    <>
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]} icon={crosswalkIcon}></Marker>
      ))}
    </>
  );
};


export const RegisterCrosswalkPlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({ name: "CrosswalkMarker", component: <CrosswalkMarker /> });
  }, []);

  return null;
};