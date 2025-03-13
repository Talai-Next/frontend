import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import api from "../api";
import NearestStationButton from "./NearestStationButton";

function Search({des, cur}){
    
   
    return(
        <div className="flex">
            <div className="flex flex-col w-[75%]">
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
            <div>
                <NearestStationButton />
            </div>
        </div>
    )

}

export default Search