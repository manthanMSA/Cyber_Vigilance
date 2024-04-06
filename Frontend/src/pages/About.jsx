import React, { useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import Adware from "../data/Adware_data_1.json";
import Backdoor from "../data/Backdoor_data_1.json";
import Cryptojacking from "../data/Cryptojacking_data_1.json";
import Databreach from "../data/Data Breach_data_1.json";
import Datapoisoning from "../data/Data Poisoning_data_1.json";
import Ddos from "../data/Ddos.json";
import DnsSpoofing from "../data/DNS Spoofing_data_1.json";
import Keylogger from "../data/Keylogger_data_1.json";
import Malware from "../data/Malvertising_data_1.json";
import PasswordAttack from "../data/Password Attack_data_1.json";
import Phishing from "../data/Phishing_data_1.json";
import SqlInjection from "../data/SQL Injection_data_1.json";
import "./About.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const About = () => {
  const [selectedDataType, setSelectedDataType] = useState("AdwareData");

  const dataTypes = {
    Adware,
    Backdoor,
    Cryptojacking,
    Databreach,
    Datapoisoning,
    Ddos,
    DnsSpoofing,
    Keylogger,
    Malware,
    PasswordAttack,
    Phishing,
    SqlInjection,
  };

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  return (
    <div className="about-container">
    <div className="About">
      <div className="filterContainer">
        <label htmlFor="dataType">Filter by Attack Type:</label>
        <select id="dataType" value={selectedDataType} onChange={handleDataTypeChange}>
          {Object.keys(dataTypes).map((dataType) => (
            <option key={dataType} value={dataType}>
              {dataType}
            </option>
          ))}
        </select>
      </div>
      <div className="dataCard graph">
        {dataTypes[selectedDataType] && dataTypes[selectedDataType].data && dataTypes[selectedDataType].options ? (
          <Line
            data={dataTypes[selectedDataType].data}
            options={{
              ...dataTypes[selectedDataType].options,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Month",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Prediction",
                  },
                },
              },
              plugins: {
                ...dataTypes[selectedDataType].options.plugins,
                annotation: {
                  annotations: {
                    line1: {
                      type: "line",
                      xMin: dataTypes[selectedDataType].data.labels.indexOf("January-2024"),
                      xMax: dataTypes[selectedDataType].data.labels.indexOf("January-2024"),
                      borderColor: "red",
                      borderWidth: 4,
                      zIndex: 1,
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p>No data available for the selected data type.</p>
        )}
      </div>
    </div>
  </div>
  
    );
};