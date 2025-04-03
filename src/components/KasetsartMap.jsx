import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBounds } from "leaflet";
import { usePlugins } from "../core/PluginManager";
import api from "../api";

const KasetsartMap = () => {
  const [center] = useState([13.848, 100.572]);
  const zoomLevel = 15;
  const mapRef = useRef(null);
  const belowCorner = [13.839563587416649, 100.55769499783278];
  const highCorner = [13.858085158658463, 100.5886411472553];
  const bounds = new LatLngBounds(belowCorner, highCorner);

  const { plugins } = usePlugins();
  const [locations, setLocations] = useState({});
  console.log(locations)
  useEffect(() => {
    getBusStopLocation();
  }, []);

  const getBusStopLocation = async () => {
    try {
      const response = await api.get("/api/bus-stop-location/");
      setLocations(response.data);
    } catch (error) {
      alert(`Failed to fetch bus stop locations : ${error}`);
    }
  };

  return (
    <div style={{ height: "500px", width: "100%" }} className="my-3 border border-gray-300">
      <MapContainer
        center={center}
        zoom={zoomLevel}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        minZoom={zoomLevel}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />

        {plugins.map((plugin) => (
          <React.Fragment key={plugin.name}>{plugin.component}</React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default KasetsartMap;
