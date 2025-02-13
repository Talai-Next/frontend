import './index.css'
import LineCardInfo from './components/LineCardInfo';
import Header from './components/Header';
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { IoColorFillOutline } from "react-icons/io5";
import "./index.css";
import TextField from "@mui/material/TextField";
import KasetsartMap from "./components/KasetsartMap";

function Home() {
  return (
      <div className='flex flex-col w-screen'>
        <Header />
        <div>
            <KasetsartMap />
        </div>
        <div className='px-5 py-2'>
            <LineCardInfo />
      </div>
    </div>
  );
}

export default Home;
