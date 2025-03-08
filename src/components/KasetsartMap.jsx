// import React, { useState, useRef, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { LatLngBounds } from "leaflet";
// import L from "leaflet";
// import api from "../api";

// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/256/7561/7561230.png",
//   iconSize: [35, 35],
//   popupAnchor: [0, -32],
//   iconAnchor: [17, 30],
// });

// const KasetsartMap = () => {
//   const [center] = useState([13.848, 100.572]);
//   const zoomLevel = 15;
//   const mapRef = useRef(null);
//   const belowCorner = [13.839563587416649, 100.55769499783278];
//   const highCorner = [13.858085158658463, 100.5886411472553];
//   const bounds = new LatLngBounds(belowCorner, highCorner);

//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [locations, setLocations] = useState({});

//   useEffect(() => {
//     getBusStopLocation();
//   }, []);

//   const getBusStopLocation = async () => {
//     try {
//       const response = await api.get("/api/bus-stop-location/");
//       setLocations(response.data);
//     } catch (error) {
//       alert("Failed to fetch bus stop locations");
//     }
//   };

//   const MapClickHandler = () => {
//     useMapEvents({
//       click: (e) => {
//         setMarkerPosition(e.latlng);
//       },
//     });
//     return null;
//   };

//   return (
//     <div
//       style={{ height: "500px", width: "100%" }}
//       className="my-3 border border-gray-300"
//     >
//       <MapContainer
//         center={center}
//         zoom={zoomLevel}
//         ref={mapRef}
//         style={{ height: "100%", width: "100%" }}
//         bounds={bounds}
//         maxBounds={bounds}
//         maxBoundsViscosity={1.0}
//         minZoom={zoomLevel}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//         />

//         <MapClickHandler />
//         {Object.keys(locations).map((key) => {
//           return (
//             <Marker
//               key={key}
//               position={[locations[key].latitude, locations[key].longitude]}
//               icon={customIcon}
//             >
//               <Popup>
//                 <h5>[{locations[key].station_code}]</h5>
//                 <div>
//                   <b>{locations[key].name}</b>
//                 </div>
//               </Popup>
//             </Marker>
//           );
//         })}

//         {markerPosition && (
//           <Marker position={markerPosition} draggable={true}>
//             <Popup>
//               <div>
//                 <b>Lat:</b> {markerPosition.lat} <br />
//                 <b>Lng:</b> {markerPosition.lng}
//               </div>
//             </Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default KasetsartMap;

import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
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

  useEffect(() => {
    getBusStopLocation();
  }, []);

  const getBusStopLocation = async () => {
    try {
      const response = await api.get("/api/bus-stop-location/");
      setLocations(response.data);
    } catch (error) {
      alert("Failed to fetch bus stop locations");
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
