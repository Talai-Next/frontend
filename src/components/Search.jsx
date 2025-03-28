import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import api from "../api";
import NearestStationButton from "./NearestStationButton";
import SwapButton from "./SwapButton";

function Search({des, cur}){
    
   
    return(
        <div className="flex">
            <div className="flex flex-col w-[90%]">
                <div className="mb-5">
                    <SearchBar 
                        searchLable="ตำแหน่งของคุณ"
                        value={cur ? cur.name : null}
                        state="cur"/>
                </div>
                <SearchBar 
                    searchLable="กำลังนำทางไป"
                    value={des ? des.name : null }
                    state="des"/>
            </div>
            <div className="flex flex-col mx-5">
                <NearestStationButton />
                
                <div className="flex mt-2 justify-center items-center">
                    <SwapButton />
                </div>
            </div>
        </div>
    )

}

export default Search