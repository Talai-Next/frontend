const API_URL = "/api/live-bus-data/";
const MOVE_DURATION = 1500;

const BusMarker = () => {
    const [locations, setLocations] = useState({});
    const markersRef = useRef({});
  const API_URL = "/api/buses/";
const MOVE_DURATION = 1500;

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