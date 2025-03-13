import { Button } from "@mui/material";
import { MdMyLocation } from "react-icons/md";
import useNearestStation from "../hooks/NearestStation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 

function NearestStationButton(){
    const { nearestStation, fetchNearesStation } = useNearestStation();
    const nearStation = nearestStation;
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // retrive old route
    const curId = searchParams.get('cur') || '';
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
                    sx={{height: "55px"}}>
                    <MdMyLocation />
                    <p className="ml-2 text-xl">สถานีใกล้ฉัน</p>
                </Button>
            </div>
    )
}

export default NearestStationButton;