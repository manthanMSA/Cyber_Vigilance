import React, { useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import Accommodation_and_Food_Service from '../sector_data/Accommodation and Food Service.json';
import Administrative_and_Support_Services from "../sector_data/Administrative and Support Services.json";
import Arts_Entertainment_and_Recreation from "../sector_data/Arts, Entertainment, and Recreation.json";
//import Extraterritorial_Organizations_and_Bodies from "../sector_data/Extraterritorial Organizations and Bodies.json ";
import Finance_and_Insurance from "../sector_data/Finance and Insurance.json";
import Education from "../sector_data/Education.json";
import Healthcare from "../sector_data/Healthcare.json";
import Individual from "../sector_data/Individual.json";
import Information_and_communication from "../sector_data/Information and Communication.json";
import Mining_and_Quarrying from "../sector_data/Mining and Quarrying.json";
import Multiple_Industries from "../sector_data/Multiple Industries.json";
import Other_Services from "../sector_data/Other Services.json";
import Professional_Scientific_and_Technical_Services from "../sector_data/Professional, Scientific, and Technical Services.json";
import Public_Admin from "../sector_data/Public Administration and Defense.json";
import Real_Estate from "../sector_data/Real Estate.json";
import Transportation_Storage from "../sector_data/Transportation and Storage.json";
import Unknown from "../sector_data/Unknown.json";
import Utilities from "../sector_data/Utilities.json";
import Wholesale_and_retail from "../sector_data/Wholesale and Retail Trade.json";
import "../pages/About.css"

// import data from '../../src/sector_graph/sector.json';

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Sector = () => {
  const [selectedDataType, setSelectedDataType] = useState("Accommodation_and_Food_Service");

  const dataTypes = {
    Accommodation_and_Food_Service: { data: Accommodation_and_Food_Service, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources." },
    Administrative_and_Support_Services:{ data: Administrative_and_Support_Services, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources." },
    Arts_Entertainment_and_Recreation:{ data: Arts_Entertainment_and_Recreation, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources." },
    //Extraterritorial_Organizations_and_Bodies,
    Finance_and_Insurance:{ data: Finance_and_Insurance, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources." },
    Education: {data: Education, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Healthcare: {data: Healthcare, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Individual: {data: Individual, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Information_and_communication: {data: Information_and_communication, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Mining_and_Quarrying: {data: Mining_and_Quarrying, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Multiple_Industries: {data: Multiple_Industries, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Other_Services: {data: Other_Services, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Professional_Scientific_and_Technical_Services: {data: Professional_Scientific_and_Technical_Services, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Public_Admin: {data: Public_Admin, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Real_Estate: {data: Real_Estate, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Public_Admin: {data: Professional_Scientific_and_Technical_Services, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Transportation_Storage: {data: Transportation_Storage, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Unknown: {data: Unknown, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Utilities: {data: Utilities, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
    Wholesale_and_retail: {data: Wholesale_and_retail, description: "Adware is software that automatically displays or downloads advertising material (often unwanted) when a user is online.", mitigation: "Install ad-blocking software, keep antivirus software up to date, be cautious of downloading free software from untrusted sources."},
  };

  const handleDataTypeChange = (event) => {
    setSelectedDataType(event.target.value);
  };

  return (
    <div className="about-container">
      <div className="About">
      <h2>Forecasting by Smoothing SVM</h2>
      <br></br>
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
          {dataTypes[selectedDataType] && dataTypes[selectedDataType].data && dataTypes[selectedDataType].data.data && dataTypes[selectedDataType].data.options ? (
            <>
              <Line
                data={dataTypes[selectedDataType].data.data}
                options={{
                  ...dataTypes[selectedDataType].data.options,
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
                    ...dataTypes[selectedDataType].data.options.plugins,
                    annotation: {
                      annotations: {
                        line1: {
                          type: "line",
                          xMin: dataTypes[selectedDataType].data.data.labels.indexOf("January-2024"),
                          xMax: dataTypes[selectedDataType].data.data.labels.indexOf("January-2024"),
                          borderColor: "red",
                          borderWidth: 4,
                          zIndex: 1,
                        },
                      },
                    },
                  },
                }}
              />
            </>
          ) : (
            <p>No data available for the selected data type.</p>
          )}
        </div>
        
      </div>
      <div>
        {dataTypes[selectedDataType] && dataTypes[selectedDataType].data && dataTypes[selectedDataType].data.data && dataTypes[selectedDataType].data.options ? (
            <> 

 
            </>
        ):(
          <p>No data available for the selected data type.</p>
        )}
        </div>
    </div>
    
  );
};

export default Sector;