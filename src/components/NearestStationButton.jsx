import { Button } from "@mui/material";
import { MdMyLocation } from "react-icons/md";
import useNearestStation from "../hooks/NearestStation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import { useTranslation } from "react-i18next";

function NearestStationButton(){
    const { nearestStation } = useNearestStation();
    const nearStation = nearestStation;
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();
    // retrive old route
    const desId = searchParams.get('des') || '';

    function handleClick(){
        const encodedId = btoa(nearStation.id)
        searchParams.set('cur', encodedId);
        searchParams.set('des', desId);
        navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    
        return(
            <div>
                <Button 
                    variant="contained"
                    onClick={() => handleClick()}   
                    sx={{height: "55px", width: "180px"}}>
                    <MdMyLocation />
                    <p className="ml-2 text-xl">{t('nearby_station')}</p>
                </Button>
            </div>
    )
}

export default NearestStationButton;