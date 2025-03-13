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
import useFetchData from "./hooks/FetchData";
import useNearestStation from "./hooks/NearestStation"

function Home() {
  const [searchParams] = useSearchParams();
  const { stationData, line1, line3, line5, lineSpecail, loading } = useFetchData();  // Use custom hook
  const [destinationStation, setDestinationStation] = useState({})
  const [currentStation, setCurrentStation] = useState({})
  const { nearestStation, fetchNearesStation } = useNearestStation();
  const nearStation = nearestStation;

  function retrieveCurrentStation(){
    const curParams = searchParams.get('cur');
    const currentId = curParams ? atob(curParams) : null;
    const station = currentId ? stationData.find((station) => station.id == currentId) : null
    setCurrentStation(station)
  }

  function retrieveDestinationStation(){
    const desParams = searchParams.get('des');
    const destinationId = desParams ? atob(desParams) : null;
    const station = destinationId ? stationData.find((station) => station.id == destinationId) : null
    setDestinationStation(station)
  }

  useEffect(() => {
    retrieveDestinationStation();
    retrieveCurrentStation()
    
  }, [searchParams, stationData]);

  return (
      <div className='flex flex-col w-screen'>
        <Header />
        {destinationStation ? (
          <div className='my-2 mx-5'>
            <Search 
              cur={currentStation ? currentStation : null}
              des={destinationStation ? destinationStation : null}/>
          </div>
        ) :(
          <div className='my-2 mx-5'>
            <SearchBar 
              searchLable="ค้นหาที่นี่"
              state="des"/>
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
