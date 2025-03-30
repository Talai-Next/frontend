import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "@/api";
import { usePlugins } from "../core/PluginManager";

const API_URL = "/api/live-bus-data/";
const MOVE_DURATION = 1500;

const BusMarker = () => {
  const [locations, setLocations] = useState({});
  const markersRef = useRef({});

  const markerIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5193/5193846.png",
      iconSize: [35, 35],
      iconAnchor: [17, 30],
      popupAnchor: [0, -32],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(API_URL);
        const newLocations = response.data.reduce((acc, bus) => {
          acc[bus.bus_id] = bus;
          return acc;
        }, {});

        Object.keys(newLocations).forEach((busId) => {
          if (markersRef.current[busId]) {
            animateMarker(markersRef.current[busId], newLocations[busId]);
          }
        });

        setLocations(newLocations);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const animateMarker = (marker, newLocation) => {
    if (!marker) return;

    const startPos = marker.getLatLng();
    const endPos = L.latLng(newLocation.latitude, newLocation.longitude);
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / MOVE_DURATION, 1);

      const interpolatedLat =
        startPos.lat + (endPos.lat - startPos.lat) * progress;
      const interpolatedLng =
        startPos.lng + (endPos.lng - startPos.lng) * progress;

      marker.setLatLng([interpolatedLat, interpolatedLng]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      {Object.keys(locations).map((busId) => {
        const bus = locations[busId];

        return (
          <Marker
            key={busId}
            position={[bus.latitude, bus.longitude]}
            icon={markerIcon}
            ref={(marker) => {
              if (marker) markersRef.current[busId] = marker;
            }}
          >
            <Popup>
              <h5>Bus Line: {bus.line || "N/A"}</h5>
              <div>
                <b>Speed: {bus.speed ? `${bus.speed} km/h` : "Unknown"}</b>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default BusMarker;

export const RegisterBusMarkerPlugin = ({ isVisible }) => {
  const { registerPlugin, unregisterPlugin } = usePlugins();

  useEffect(() => {
    if (isVisible) {
      registerPlugin({ name: "BusMarker", component: <BusMarker /> });
    } else {
      unregisterPlugin("BusMarker");
    }

    return () => unregisterPlugin("BusMarker");
  }, [isVisible]);

  return null;
};
