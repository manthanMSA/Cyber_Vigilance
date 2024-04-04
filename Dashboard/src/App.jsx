import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./App.css";

import chartData from "/src/data/Advanced persistent_data_1.json";
// import chartData from "/src/data/Backdoor_data_1.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [vulnerabilityData, setVulnerabilityData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  // const handleWebsiteUrl = async (url) => {
  //   if (!url.trim()) {
  //     setErrorMessage("Please enter a website URL.");
  //     return;
  //   }

  //   console.log("Executing Bash file with URL:", url);

  // };

  const handleVulnerabilityCheck = async () => {
    setIsLoading(true); 
    if (!organizationName.trim()) {
      setErrorMessage("Please enter your organization name.");
      setIsLoading(false); 
      return;
    }

    setErrorMessage("");

    try {
      const encodedOrgName = encodeURIComponent(organizationName); 
      const response = await fetch(
        `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodedOrgName}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const actualData = data.vulnerabilities[0].cve.metrics.cvssMetricV2[0];
      // console.log("data:",actualData);
      setVulnerabilityData(actualData); 
      console.error("Error fetching vulnerabilities:", error);
      setErrorMessage("An error occurred while fetching vulnerabilities.");
    } finally {
      setIsLoading(false); 
    }
  };

  // useEffect(() => {
  //   console.log("vulnerabilityData after update:", vulnerabilityData);
  // }, [vulnerabilityData]);

  const handleChangeOrganizationName = (event) => {
    setOrganizationName(event.target.value);
  };

  const handleChangeWebsiteUrl = (event) => {
    setWebsiteUrl(event.target.value);
  };

  // useEffect(() => {
  //   if (!organizationName) {
  //     setVulnerabilityData(null);
  //     setErrorMessage("");
  //   }
  // }, [organizationName]);

  useEffect(() => {
    if (!organizationName || !websiteUrl) {
      setVulnerabilityData(null);
      setErrorMessage("");
    }
  }, [organizationName, websiteUrl]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      <div className="dataCards">
        <div className="dataCard revenueCard">
          <Line data={chartData.data} options={chartData.options} />
        </div>
      </div>

      <div className="vulnerability-check-form">
        <h3>Organization Name</h3>
        <input
          type="text"
          placeholder="Enter your organization name"
          value={organizationName}
          onChange={handleChangeOrganizationName}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVulnerabilityCheck}>Submit</button>
      </div>

      {isLoading && ( 
        <div className="loading-indicator">
          <p>Fetching vulnerability data...</p>
        </div>
      )}

      {vulnerabilityData && (
  <div className="vulnerability-results">
    <h2>Vulnerability Results:</h2>
    <table className="vulnerability-table"> 
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Impact Score</td>
          <td>{vulnerabilityData.impactScore}</td>
        </tr>
        <tr>
          <td>Base Severity</td>
          <td>{vulnerabilityData.baseSeverity}</td>
        </tr>
        <tr>
          <td>Exploitability Score</td>
          <td>{vulnerabilityData.exploitabilityScore}</td>
        </tr>
        <tr>
          <td>Base Score</td>
          <td>{vulnerabilityData.cvssData.baseScore}</td>
        </tr>
        <tr>
          <td>Availability Impact</td>
          <td>{vulnerabilityData.cvssData.availabilityImpact}</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

{/* <div className="vulnerability-check-form">

        <h3 className="styling">Website URL</h3>
        <input
          type="text"
          placeholder="Enter website URL"
          value={websiteUrl}
          onChange={handleChangeWebsiteUrl}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVulnerabilityCheck}>Submit</button>
      </div> */}
    </div>
  );
};





