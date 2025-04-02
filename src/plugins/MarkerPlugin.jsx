import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
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
  const busLineRef = useRef(new Map());
  const routingControlRef = useRef(null);
  const map = useMap();

  const unSelectMarkerIcon = new L.Icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor,
  });

  const selectMarkerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3448/3448339.png",
    iconSize,
    iconAnchor,
    popupAnchor,
  });

  useEffect(() => {
    api
      .get(apiUrl)
      .then((response) => setLocations(response.data))
      .catch(() => alert("Failed to fetch bus stop locations"));
  }, [apiUrl]);

  useEffect(() => {
    if (!selectLine) {
      setBusLine([]);
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      return;
    }

    if (busLineRef.current.has(selectLine)) {
      setBusLine(busLineRef.current.get(selectLine));
      drawRoute(busLineRef.current.get(selectLine));
      return;
    }

    const lineMap = {
      1: "line-one",
      3: "line-three",
      5: "line-five",
      พิเศษ: "line-special",
    };

    const endpoint = lineMap[selectLine];
    if (!endpoint) return;

    api
      .get(`/api/${endpoint}/`)
      .then((response) => {
        busLineRef.current.set(selectLine, response.data);
        setBusLine(response.data);
        drawRoute(response.data);
      })
      .catch(() => alert("Failed to fetch bus line data"));
  }, [selectLine, map]);

  const drawRoute = (routeData) => {
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    if (routeData.length > 1) {
      const waypoints = routeData.map((point) =>
        L.latLng(point.station.latitude, point.station.longitude)
      );

      routingControlRef.current = L.Routing.control({
        waypoints,
        routeWhileDragging: true,
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: "green", weight: 5 }],
        },
        show: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        collapsible: false,
        containerClassName: "hidden",
      }).addTo(map);

      map.fitBounds(L.latLngBounds(waypoints));
    }
  };

  return (
    <>
      {locations.map((location, index) => {
        const isSelected = busLine.some(
          (b) => b.station.station_code === location.station_code
        );
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
    </>
  );
};

export default MarkerPlugin;
