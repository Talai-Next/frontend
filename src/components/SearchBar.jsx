import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom"; 


function SearchBar({searchLable,value}){
  const [isButtonOpen, setIsButtonOpen] = useState(true)
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navigate = useNavigate();
  useEffect(() => {
    if (value) {
      // If value is passed, set the input to it
      setInput(value);
      setIsButtonOpen(false)
    }
  }, [value]);

  useEffect(() => {
    if (input.trim() === "") {
      // when input is empty
      setList([]); // Clear list 
      setFocusedIndex(-1); // Reset focused index 
      setIsButtonOpen(true)
      return;
    }
    if (input === value) {
      // Hide the button list if the input matches the remembered value
      setIsButtonOpen(false);
      return;
    } else {
      setIsButtonOpen(true);
    }

    async function fetchData() {
      try {
        const response = await api.get("/api/bus-stop-location/");
        const filteredList = response.data.filter((station) =>
          station.name.toLowerCase().includes(input.toLowerCase())
        );
        setList(filteredList);
        setFocusedIndex(-1); 
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [input]); // Runs when `input` changes

  function handleSearch(stationId){
    setIsButtonOpen(false);
    const encodedId = btoa(stationId)
    navigate(`/?des=${encodedId}`); // Pass the input as a query parameter to the root URL
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (focusedIndex >= 0 && focusedIndex < list.length){
        handleSearch(list[focusedIndex].id)
      }else{
        const station = list.find(item => item.name == input)
      if (station){
        const encodedId = btoa(station.id)
        navigate(`/?des=${encodedId}`);
      } else {
        alert("This station is not existed")
      }
      }
    }
    if (e.key === "ArrowDown") {
      // Move focus down the list
      setFocusedIndex((prevIndex) =>
        prevIndex < list.length - 1 ? prevIndex + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      // Move focus up the list
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : list.length - 1
      );
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label={searchLable}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
        <div className="flex flex-col relative shadow-md">
        {list.length > 0 && isButtonOpen && (
                <div className="flex flex-col items-start ">
                    {list.map((station, index) => (
                        <Button
                         variant="text"
                         onClick={() => handleSearch(station.id)}   
                         sx={{ 
                          textAlign: "left", 
                          width: "100%", 
                          justifyContent: "flex-start", 
                          position: "relative", 
                          zIndex: 0,
                          backgroundColor: focusedIndex === index ? "#d1d5db" : "white",'&:hover': { backgroundColor: "#d1d5db" }                         
                        }}
                         >
                          {station.station_code}:{station.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default SearchBar;
