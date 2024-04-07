import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
    <Router>
      <div>
        <div class="topnav">
          <Link to="/" class="active">
            HOME
          </Link>
          <Link to="/about">FORCASTING</Link>
          <Link to="/vulneribility">CHECK VULNERABILTIY</Link>
          <Link to="/score">THREAT SCORE</Link>
        </div>
        {/* </div> */}

        {/* <StaggeredDropDown/> */}
        <Routes>
          <Route path="/" element={<Dashboard1 />} />
          <Route path="/about" element={<About />} />
          <Route path="/vulneribility" element={<Vulnerability />} />
<<<<<<< HEAD
          <Route path="/score" element={<ThreatScore/>} />
          <Route path="/sector" element={<Sector/>}/>
=======
          <Route path="/score" element={<ThreatScore />} />
>>>>>>> e93e37af35236aa167148a54fa255191403e69f0
        </Routes>

        <div
          className="staggered-dropdown"
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <StaggeredDropDown />
        </div>
      </div>
    </Router>
  );
};
