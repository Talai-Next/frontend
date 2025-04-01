import React, { useEffect, useState, useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import api from "../api";

const MarkerPlugin = ({
  apiUrl,
  iconUrl,
  iconSize,
  iconAnchor,
  popupAnchor,
  selectLine,
}) => {
  const [locations, setLocations] = useState([]);
  const [busLine, setBusLine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const busLineRef = useRef(new Map());

  const unSelectMarkerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: iconUrl,
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        popupAnchor: popupAnchor,
      }),
    [iconUrl, iconSize, iconAnchor, popupAnchor]
  );

  const selectMarkerIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/3448/3448339.png",
        iconSize: iconSize,
        iconAnchor: iconAnchor,
        popupAnchor: popupAnchor,
      }),
    [iconSize, iconAnchor, popupAnchor]
  );

  useEffect(() => {
    api
      .get(apiUrl)
      .then((response) => setLocations(response.data))
      .catch(() => alert("Failed to fetch bus stop locations"));
  }, [apiUrl]);

  useEffect(() => {
    if (!selectLine) {
      setBusLine([]);
      return;
    }

    if (busLineRef.current.has(selectLine)) {
      setBusLine(busLineRef.current.get(selectLine));
      return;
    }

    setIsLoading(true);
    api
      .get(`/api/line-one/`)
      .then((response) => {
        busLineRef.current.set(selectLine, response.data);
        setBusLine(response.data);
      })
      .catch(() => alert("Failed to fetch bus line data"))
      .finally(() => setIsLoading(false));
  }, [selectLine]);

  const busLineStationCodes = useMemo(() => {
    return new Set(busLine.map((b) => b.station.station_code));
  }, [busLine]);

  return (
    <>
      {locations.map((location, index) => {
        const isSelected =
          busLineStationCodes.size > 0 &&
          busLineStationCodes.has(location.station_code);

        return (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={isSelected ? selectMarkerIcon : unSelectMarkerIcon}
          >
            <Popup>
              <h5>[{location.station_code}]</h5>
              <div>
                <b>{location.name}</b>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {isLoading && <div className="loading">Loading new markers...</div>}
    </>
  );
};

export default MarkerPlugin;
