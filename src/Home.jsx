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
  const [lineSpecail, setLineSpecail] = useState([]);

  const fetchData = async () => {
    try{
      const response1 = await api.get("/api/line-one/")
      const responseSpecial = await api.get("/api/line-special/")
      setLine1(response1.data || [] );
      setLineSpecail(responseSpecial.data || [])
    } catch (error) {
      alert(error +"Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className='flex flex-col w-screen'>
        <Header />
        <div>
            <KasetsartMap />
        </div>
        <div className='px-5 py-2'>
            <LineCardInfo 
              line="1"
              data={line1}/>
            <LineCardInfo 
              line="พิเศษ"
              data={lineSpecail}
            />
      </div>
    </div>
  );
}

export default Home;
