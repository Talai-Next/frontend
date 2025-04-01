import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import api from "../api";
import NearestStationButton from "./NearestStationButton";
import SwapButton from "./SwapButton";
import { useTranslation } from "react-i18next";

function Search({des, cur}){
    const { t, i18n } = useTranslation();
    return(
        <div className="flex">
            <div className="flex flex-col w-[90%]">
                <div className="mb-5">
                    <SearchBar 
                        searchLable={t('cur_location')}
                        value={cur ? (i18n.language === 'th' ? cur.name : cur.name_eng) : null}
                        state="cur"/>
                </div>
                <SearchBar 
                    searchLable={t('des_location')}
                    value={des ? (i18n.language === 'th' ? cur.name : des.name_eng) : null}

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