import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const KasetsartMap = () => {
  const [center] = useState([13.848, 100.572]);
  const zoomLevel = 17;
  const mapRef = useRef(null);

  return (
    <div style={{ height: "500px", width: "100%" }} className="my-4 rounded-xl border-2 border-gray-300">
      <MapContainer center={center} zoom={zoomLevel} ref={mapRef} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
      </MapContainer>
    </div>
  );
};

export default KasetsartMap;
