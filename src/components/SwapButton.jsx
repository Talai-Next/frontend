import { Button } from "@mui/material";
import useNearestStation from "../hooks/NearestStation";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import { IoSwapVertical } from "react-icons/io5";

function SwapButton(){
    const { nearestStation, fetchNearesStation } = useNearestStation();
    const nearStation = nearestStation;
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // retrive old route
    const curId = searchParams.get('cur') || '';
    const desId = searchParams.get('des') || '';

    function handleClick(){
        searchParams.set('cur', desId);
        searchParams.set('des', curId);
        navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    
        return(
            <div className="justify-center items-center">
                <Button 
                    variant="outlined"
                    onClick={() => handleClick()}   
                    sx={{height: "70px", borderRadius:"100%",'&:hover': { backgroundColor: "#d1d5db" }}}>
                    <IoSwapVertical 
                        size={40}/>
                </Button>
            </div>
    )
}

export default SwapButton;