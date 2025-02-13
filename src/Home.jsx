"use client"
import './index.css'
import LineCardInfo from './components/LineCardInfo';
import Header from './components/Header';
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { IoColorFillOutline } from "react-icons/io5";
import "./index.css";
import TextField from "@mui/material/TextField";
import KasetsartMap from "./components/KasetsartMap";
import api from "./api";

function Home() {
  const [line1, setLine1] = useState([]);
  const getLineOneRoute = async () => {
    try{
      const response = await api.get("/line-one/")
      console.log("response", response.data);
      setLine1(response.data || [] );
    } catch (error) {
      alert(error +"Failed to fetch line 1 route");
    }
  };

  useEffect(() => {
    getLineOneRoute();
  }, []);

  return (
      <div className='flex flex-col w-screen'>
        <Header />
        <div>
            <KasetsartMap />
        </div>
        <div className='px-5 py-2'>
            <LineCardInfo 
              data={line1}/>
      </div>
    </div>
  );
}

export default Home;
