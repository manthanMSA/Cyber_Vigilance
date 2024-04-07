import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import StaggeredDropDown from '/src/components/chatbot.jsx';

import "./App.css";

// import chartData from "/src/data/Advanced persistent_data_1.json";
import StaggeredDropDown from "./components/chatbot";
// import chartData2 from "/src/data/Backdoor_data_1.json";
import Dashboard1 from "./components/Dashboard1.jsx";
import Vulnerability from "./pages/Vulnerability";
import { About } from "./pages/About";
import ThreatScore from "./pages/ThreatScore";
import Sector from "./pages/Sector.jsx";

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
      {/* <div>
        <div class="topnav">
          <a class="active" href="/">HOME</a>
          <a href="/about">FORCASTING</a>
          <a href="/vulneribility">CHECK VULNERABILTIY</a>
          <a href="/score">Threat Score</a>
        </div> */}
        <div>
    <div class="topnav">
      <Link to="/" class="active">HOME</Link>
      <Link to="/about">FORCASTING</Link>
      <Link to="/vulneribility">CHECK VULNERABILTIY</Link>
      <Link to="/score">Threat Score</Link>
    </div>
  {/* </div> */}

        

        {/* <StaggeredDropDown/> */}
        <Routes>
          <Route path="/" element={<Dashboard1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/vulneribility" element={<Vulnerability />} />
          <Route path="/score" element={<ThreatScore/>} />
          <Route path="/sector" element={<Sector/>}/>
        </Routes>

        <div className="staggered-dropdown" style={{ position: "fixed", bottom: "20px", right: "20px" }}>
          <StaggeredDropDown/>
        </div>

      </div>
    </Router>
  );
};


