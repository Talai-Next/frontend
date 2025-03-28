import { useState, useEffect } from "react";
import api from "../api";
import { useSearchParams, useNavigate } from "react-router-dom";

function useAvailableLine() {
  const [searchParams] = useSearchParams();
  const [availableLine, setAvailableLine] = useState([]);

  // retrieve search params
  const encodedCur = searchParams.get('cur') || null;
  const cur = encodedCur ? atob(encodedCur) : null

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cur){
          const responseAvailable = await api.get(`/api/search/available-line/?cur=${cur}`)
          setAvailableLine(responseAvailable.data || [])
        }
       
      } catch (error) {
        alert(error + "Failed to fetch available line");
      } 
    };

    fetchData();
  }, [searchParams]);




  return {availableLine};
}

export default useAvailableLine;
