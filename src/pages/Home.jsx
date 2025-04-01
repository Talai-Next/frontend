"use client";
import "../index.css";
import LineCardInfo from "../components/LineCardInfo";
import { useState, useEffect } from "react";
import KasetsartMap from "../components/KasetsartMap";
import api from "../api";
import { RegisterBusStopPlugin } from "../plugins/BusStopMarkers";
import { PluginProvider } from "../core/PluginManager";
import { RegisterCrosswalkPlugin } from "../plugins/CrosswalkMarkers";
import { RegisterSpeedBouncePlugin } from "../plugins/SpeedBounceMarker";
import MarkerSetting from "../components/MarkerSetting";
import { RegisterBusMarkerPlugin } from "@/plugins/BusMarker";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Search from "../components/Search";
import useFetchData from "../hooks/FetchData";
import useNearestStation from "../hooks/NearestStation"
import useAvailableLine from "../hooks/AvailableLine";
import useLineSuggestion from "../hooks/LineSuggestion";
import useBusDetail from "../hooks/BusDetail"
import { useTranslation } from "react-i18next";
function Home() {
  const [showBusstop, setShowBusstop] = useState(true);
  const [showCrosswalk, setShowCrosswalk] = useState(false);
  const [showSpeedBump, setShowSpeedBump] = useState(false);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true)
  const { stationData, line1, line3, line5, lineSpecail, loading} = useFetchData();  // Use custom hook
  const { availableLine } = useAvailableLine();
  const [destinationStation, setDestinationStation] = useState({})
  const [currentStation, setCurrentStation] = useState({})
  const navigate = useNavigate();
  const { nearestStation, fetchNearestStation } = useNearestStation();
  const { line } = useLineSuggestion();
  const { bus1, bus3, bus5, busS, time1, time3, time5, timeS } = useBusDetail();
  const nearStation = nearestStation;
  const { t, i18n } = useTranslation();

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
  // const bus = [{bus:1, cur:3},{bus:2,cur:4},{bus:3,cur:8}]
  // console.log("bus")
  

  return (

    <div className='flex flex-col min-w-screen h-full overflow-hidden'>
      {destinationStation ? (
          <div className='my-2 mx-5'>
            <Search 
              cur={currentStation ? currentStation : null}
              des={destinationStation ? destinationStation : null}/>
          </div>
        ) :(
          <div className='my-2 mx-5'>
            <SearchBar 
              searchLable={t('search')}
              state="des"/>
          </div>
          
        )
      }
      <PluginProvider>
        <RegisterBusStopPlugin isVisible={showBusstop} />
        <RegisterCrosswalkPlugin isVisible={showCrosswalk} />
        <RegisterSpeedBouncePlugin isVisible={showSpeedBump} />
        <RegisterBusMarkerPlugin isVisible={true} />
        <div className="">
          <KasetsartMap />
        </div>
      </PluginProvider>


      <div className="flex flex-col md:flex-row  w-full  p-5 gap-6">
      {loading ? (
          <div className="text-center mt-32 px-5 py-2 w-full md:w-[80vw]">
             <div role="status">
            <svg 
              aria-hidden="true" 
              className="inline w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
          </div>
        ) : (
          <div className='px-5 py-2 w-full md:w-[80vw]'>
          {/* Render available lines first */}
          {availableLine.includes("1") && (
            <LineCardInfo 
              line="1"
              data={line1}
              state={line == "1" ? "choose": null}
              bus={bus1}
              time={time1}
            />
          )}
          {availableLine.includes("3") && (
            <LineCardInfo 
              line="3"
              data={line3}
              state={line == "3" ? "choose": null}
              bus={bus3}
              time={time3}
            />
          )}
          {availableLine.includes("5") && (
            <LineCardInfo 
              line="5"
              data={line5}
              state={line == "5" ? "choose": null}
              bus={bus5}
              time={time5}
            />
          )}
          {availableLine.includes("s") && (
            <LineCardInfo 
              line={t('special')}
              data={lineSpecail}
              state={line == "s" ? "choose": null}
              bus={busS}
              time={timeS}
            />
          )}
        
          {/* Render disabled lines */}
          {(!availableLine.includes("1")) && (
            <LineCardInfo 
              line="1"
              data={line1}
              state="disable"
              bus={bus1}
              time={time1}
            />
          )}
          {(!availableLine.includes("3")) && (
            <LineCardInfo 
              line="3"
              data={line3}
              state="disable"
              bus={bus3}
              time={time3}
            />
          )}
          {(!availableLine.includes("5")) && (
            <LineCardInfo 
              line="5"
              data={line5}
              state="disable"
              bus={bus5}
              time={time5}
            />
          )}
          {(!availableLine.includes("s")) && (
            <LineCardInfo 
              line={t('special')}
              data={lineSpecail}
              state="disable"
              bus={busS}
              time={timeS}
            />
          )}
        </div>)}
        <div className="w-full md:w-[400px]">
          <MarkerSetting
            showBusstop={showBusstop}
            showCrosswalk={showCrosswalk}
            showSpeedBump={showSpeedBump}
            setShowBusstop={setShowBusstop}
            setShowCrosswalk={setShowCrosswalk}
            setShowSpeedBump={setShowSpeedBump}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
