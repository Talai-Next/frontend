import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import api from "../api";

function Search({des, cur}){
    
   
    return(
        <div>
            <div className="flex flex-col w-[75%]">
                <div className="mb-5">
                    <SearchBar 
                        searchLable="ตำแหน่งของคุณ"
                        value={cur}/>
                </div>
                <SearchBar 
                    searchLable="กำลังนำทางไป"
                    value={des}/>
            </div>
        </div>
    )

}

export default Search