import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import api from "../api";


function SearchBar(){
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (input.trim() === "") {
      setList([]); // Clear list when input is empty
      return;
    }

    async function fetchData() {
      try {
        const response = await api.get("/api/bus-stop-location/");
        const filteredList = response.data.filter((station) =>
          station.name.toLowerCase().includes(input.toLowerCase())
        );
        setList(filteredList);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [input]); // Runs when `input` changes


  return (
    <div>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
        <div className="flex flex-col relative shadow-md">
        {list.length > 0 && (
                <div className="flex flex-col items-start ">
                    {list.map((station) => (
                        <Button
                         variant="text"
                         sx={{ 
                          textAlign: "left", 
                          width: "100%", 
                          justifyContent: "flex-start", 
                          position: "relative", 
                          zIndex: 0
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
