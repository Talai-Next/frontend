import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../api";
import { usePlugins } from "../core/PluginManager";

const busStopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/256/7561/7561230.png",
  iconSize: [35, 35],
  popupAnchor: [0, -32],
  iconAnchor: [17, 30],
});

const BusStopMarkers = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get("/api/bus-stop-location/")
      .then((response) => setLocations(response.data))
      .catch(() => alert("Failed to fetch bus stop locations"));
  }, []);

  return (
    <>
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]} icon={busStopIcon}>
          <Popup>
            <h5>[{location.station_code}]</h5>
            <div><b>{location.name}</b></div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};


export const RegisterBusStopPlugin = () => {
  const { registerPlugin } = usePlugins();

  useEffect(() => {
    registerPlugin({ name: "BusStopMarkers", component: <BusStopMarkers /> });
  }, []);

  return null;
};