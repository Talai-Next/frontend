import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import api from "../api";

function Search({des}){
    const [nearestStation, setNearestStation] = useState(null)
    const [coord, setCoord] = useState(null)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    useEffect(() => {
        if (!isGeolocationAvailable) {
            alert("Your browser does not support Geolocation");
        } else if (!isGeolocationEnabled) {
            alert("Geolocation is not enabled");
        } else if (coords) {
            setCoord(coords);
        }
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    useEffect(()=>{
        if (!coord) return;
        async function fetchData() {
            try {
              const response = await api.get(`/api/search-nearby-station/?lat=${coord.latitude}&lon=${coord.longitude}`);
              setNearestStation(response.data)
            } catch (error) {
              alert("Failed to fetch data:", error);
            }
          }
        fetchData();
    }, [coord]);

   
    return(
        <div>
            <div className="flex flex-col w-[75%]">
                <div className="mb-5">
                    <SearchBar 
                        searchLable="ตำแหน่งของคุณ"
                        value={nearestStation.name}/>
                </div>
                <SearchBar 
                    searchLable="กำลังนำทางไป"
                    value={des}/>
            </div>
        </div>
    )

}

export default Search