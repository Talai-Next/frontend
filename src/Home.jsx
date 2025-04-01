"use client";
import "./index.css";
import LineCardInfo from "./components/LineCardInfo";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import "./index.css";
import KasetsartMap from "./components/KasetsartMap";
import api from "./api";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Search from "./components/Search";
import useFetchData from "./hooks/FetchData";
import useNearestStation from "./hooks/NearestStation"
import useAvailableLine from "./hooks/AvailableLine";
import useLineSuggestion from "./hooks/LineSuggestion";

function Home() {
  const [searchParams] = useSearchParams();
  const { stationData, line1, line3, line5, lineSpecail, loading} = useFetchData();  // Use custom hook
  const { availableLine } = useAvailableLine();
  const [destinationStation, setDestinationStation] = useState({})
  const [currentStation, setCurrentStation] = useState({})
  const navigate = useNavigate();
  const { nearestStation, fetchNearestStation } = useNearestStation();
  const { line } = useLineSuggestion();
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
    // auto find nearest station
    if(!currentStation && nearStation.id){
      {setCurrentStation(nearStation)}
      const encodedId = btoa(nearStation.id)
      navigate(`/?cur=${encodedId}`)
    } 
    else {
      retrieveCurrentStation()
    }
    retrieveDestinationStation();
    
  }, [searchParams, stationData]);

  // bus dummy data
  const bus = [{bus:1, cur:3},{bus:2,cur:4},{bus:3,cur:8}]
  
  return (
      <div className='flex flex-col min-w-screen h-full overflow-hidden'>
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
        {loading ? (
          <div>
           
          </div>
        ) : (
          <div className='px-5 py-2'>
          {/* Render available lines first */}
          {availableLine.includes("1") && (
            <LineCardInfo 
              line="1"
              data={line1}
              state={line == "1" ? "choose": null}
              bus={bus}
            />
          )}
          {availableLine.includes("3") && (
            <LineCardInfo 
              line="3"
              data={line3}
              state={line == "3" ? "choose": null}
              bus={bus}
            />
          )}
          {availableLine.includes("5") && (
            <LineCardInfo 
              line="5"
              data={line5}
              state={line == "5" ? "choose": null}
              bus={bus}
            />
          )}
          {availableLine.includes("s") && (
            <LineCardInfo 
              line="พิเศษ"
              data={lineSpecail}
              state={line == "s" ? "choose": null}
              bus={bus}
            />
          )}
        
          {/* Render disabled lines */}
          {(!availableLine.includes("1")) && (
            <LineCardInfo 
              line="1"
              data={line1}
              state="disable"
              bus={bus}
            />
          )}
          {(!availableLine.includes("3")) && (
            <LineCardInfo 
              line="3"
              data={line3}
              state="disable"
              bus={bus}
            />
          )}
          {(!availableLine.includes("5")) && (
            <LineCardInfo 
              line="5"
              data={line5}
              state="disable"
              bus={bus}
            />
          )}
          {(!availableLine.includes("s")) && (
            <LineCardInfo 
              line="พิเศษ"
              data={lineSpecail}
              state="disable"
              bus={bus}
            />
          )}
        </div>
        
          
        ) }
        
    </div>
  );
}

export default Home;
