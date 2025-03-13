"use client";
import "./index.css";
import LineCardInfo from "./components/LineCardInfo";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import "./index.css";
import KasetsartMap from "./components/KasetsartMap";
import api from "./api";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Search from "./components/Search";

function Home() {
  const [searchParams] = useSearchParams();
  const [stationdata, setStationdata] = useState([]);
  const [destinationStation, setDestinationStation] = useState({})
  const [line1, setLine1] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line5, setLine5] = useState([]);
  const [lineSpecail, setLineSpecail] = useState([]);
 
  const fetchData = async () => {
    try{
      const response = await api.get("/api/bus-stop-location/");
      const response1 = await api.get("/api/line-one/")
      // const response3 = await api.get("/api/line-three/")
      // const response5 = await api.get("/api/line-five/")
      const responseSpecial = await api.get("/api/line-special/")
      setStationdata(response.data || []);
      setLine1(response1.data || []);
      // setLine3(response3.data || []);
      // setLine5(response5.data || []);
      setLineSpecail(responseSpecial.data || [])
    } catch (error) {
      alert(error + "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  function retrieveDestinationStation(){
    const desParams = searchParams.get('des');
    const destinationId = desParams ? atob(desParams) : null;
    const station = destinationId ? stationdata.find((station) => station.id == destinationId) : null
    setDestinationStation(station)
  }

  useEffect(() => {
    retrieveDestinationStation();
    
  }, [searchParams, stationdata]);

  return (
      <div className='flex flex-col w-screen'>
        <Header />
        {destinationStation ? (
          <div className='my-2 mx-5'>
            <Search 
              des={destinationStation.name ? destinationStation.name : null}/>
          </div>
        ) :(
          <div className='my-2 mx-5'>
            <SearchBar 
              searchLable="ค้นหาที่นี่"/>
          </div>
        )
      }
        <div>
            <KasetsartMap />
        </div>
        <div className='px-5 py-2'>
            <LineCardInfo 
              line="1"
              data={line1}/>
            <LineCardInfo 
              line="3"
              data={line3}
            />
            <LineCardInfo 
              line="5"
              data={line5}
            />
            <LineCardInfo 
              line="พิเศษ"
              data={lineSpecail}
            />
      </div>
    </div>
  );
}

export default Home;
