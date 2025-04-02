import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@mui/material";
import api from "../api";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";

function SearchBar({ searchLable, value, state }) {
  const [isButtonOpen, setIsButtonOpen] = useState(true);
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [allStations, setAllStations] = useState([]);
  const [cachedResults, setCachedResults] = useState({});
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const curId = searchParams.get('cur') || '';
  const desId = searchParams.get('des') || '';
  const debounceTimeout = useRef(null);
  

  useEffect(() => {
    if (value) {
      setInput(value);
      setIsButtonOpen(false);
    }
  }, [value]);

  // Fetch all station data on component mount
  useEffect(() => {
    async function fetchAllStations() {
      try {
        let response;
        if (state === 'des' && desId != "") {
          response = await api.get(`/api/search/available-station/?cur=${atob(curId)}`);
        } else {
          response = await api.get("/api/bus-stop-location/");
        }
        setAllStations(response.data); // Save all stations to state
      } catch (error) {
        console.error("Failed to fetch all stations:", error);
      }
    }
    fetchAllStations();
  }, [state, curId]);

  // Trigger filtering when the input changes
  useEffect(() => {
    if (input.trim() === "") {
      setList([]);
      setFocusedIndex(-1);
      setIsButtonOpen(true);
      return;
    }

    if (input === value) {
      setIsButtonOpen(false);
      return;
    }

    if (cachedResults[input]) {
      setList(cachedResults[input]);
      setIsButtonOpen(true);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filteredList = allStations.filter(station =>
        station.name.toLowerCase().includes(input.toLowerCase())
      );

      setList(filteredList);
      setCachedResults(prev => ({ ...prev, [input]: filteredList }));
      setFocusedIndex(-1);
      setIsButtonOpen(true);
    }, 200); // Reduced debounce time since data is already loaded
  }, [input, allStations]);

  function handleSearch(stationId) {
    setIsButtonOpen(false);
    const encodedId = btoa(stationId);
    if (state === "des") {
      searchParams.set('cur', curId);
      searchParams.set('des', encodedId);
    } else {
      searchParams.set('cur', encodedId);
      searchParams.set('des', desId);
    }
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (focusedIndex >= 0 && focusedIndex < list.length) {
        handleSearch(list[focusedIndex].id);
      } else {
        const station = list.find(item => item.name === input);
        if (station) {
          handleSearch(station.id);
        } else {
          alert("This station does not exist");
        }
      }
    }
    if (e.key === "ArrowDown") {
      setFocusedIndex(prevIndex =>
        prevIndex < list.length - 1 ? prevIndex + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      setFocusedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : list.length - 1
      );
    }
  };

  function handleDropDownClick() {
    setList(allStations)
    setIsButtonOpen(!isButtonOpen);
  }

  return (
    <div>
      <div className="relative w-full">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label={searchLable}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className="dark:bg-gray-500 rounded-md"
  
      />
      <Button
        // className="absolute -translate-x-15"
        onClick={handleDropDownClick}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%"
        }}
        >
          <MdKeyboardArrowDown size={48} color={'black'}/>
      </Button>
      </div>

      <div className="flex flex-col relative shadow-md">
        {list.length > 0 && isButtonOpen && (
          <div className="flex flex-col items-start">
            {list.map((station, index) => (
              <Button
                key={station.id}
                variant="text"
                onClick={() => handleSearch(station.id)}
                sx={{
                  textAlign: "left",
                  width: "100%",
                  justifyContent: "flex-start",
                  backgroundColor: focusedIndex === index ? "#d1d5db" : "transparent",
                  '&:hover': { backgroundColor: "#d1d5db" }, 
                }}
              >
                {station.station_code}: {i18n.language == 'th' ? station.name : station.name_eng}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
