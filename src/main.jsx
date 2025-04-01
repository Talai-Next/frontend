import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from "./ThemeProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);