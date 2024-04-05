import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./App.css";

// import chartData from "/src/data/Advanced persistent_data_1.json";
// import chartData2 from "/src/data/Backdoor_data_1.json";
import Dashboard1 from "./components/dashboard1";
import Vulnerability from "./pages/Vulnerability";
import { About } from "./pages/About";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  
  return (
    // <div className="App">
    //   <nav className="navbar">
    //     <div className="logo">Logo</div>
    //     <div className="nav-links">
    //       <a href="#">Home</a>
    //       <a href="#">About</a>
    //       <a href="#">Contact</a>
    //     </div>
    //   </nav>
    //   {/* <div className="dataCards">
    //     <div className="dataCard revenueCard">
    //       <Line
    //         data={chartData.data}
    //         options={chartData.options}
    //       />
    //     </div>
    //   </div> */}
    //   <Vulnerability/>
    //   <Dashboard1 />
    // </div>
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">Logo</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/vulneribility">Vulneribility Check</Link>
            {/* <a href="#">Contact</a> */}
          </div>
        </nav>
        
        <Routes>
          <Route path="/"  element={<Dashboard1/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/vulneribility" element={<Vulnerability/>} />
        </Routes>
      </div>
    </Router>
  );
};
