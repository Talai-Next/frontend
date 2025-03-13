import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../api";

const MarkerPlugin = ({
  apiUrl,
  iconUrl,
  iconSize,
  iconAnchor,
  popupAnchor,
}) => {
  const [locations, setLocations] = useState([]);

  const markerIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor,
  });

  useEffect(() => {
    api
      .get(apiUrl)
      .then((response) => setLocations(response.data))
      .catch(() => alert("Failed to fetch bus stop locations"));
  }, [apiUrl]);

  return (
    <>
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <h5>[{location.station_code}]</h5>
            <div>
              <b>{location.name}</b>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MarkerPlugin;
