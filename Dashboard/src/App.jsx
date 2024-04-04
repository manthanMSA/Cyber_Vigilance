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
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleWebsiteUrl = async (url) => {
    if (!url.trim()) {
      setErrorMessage("Please enter a website URL.");
      return;
    }

    // Simulate Bash file execution for demonstration (replace with actual logic)
    console.log("Executing Bash file with URL:", url);
    // Replace with the actual command to execute your Bash file
    // const output = await shell.exec(`bash your_script.sh ${url}`);
    // Handle the output from the Bash file (success/failure)

  };

  const handleVulnerabilityCheck = async () => {
    setIsLoading(true); // Set loading state to true before API call
    if (!organizationName.trim()) {
      setErrorMessage("Please enter your organization name.");
      setIsLoading(false); // Set loading state to false after error
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
        {/* <h3 className="styling">Website URL</h3>
        <input
          type="text"
          placeholder="Enter website URL"
          value={websiteUrl}
          onChange={handleChangeWebsiteUrl}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVulnerabilityCheck}>Submit</button> */}
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

<div className="vulnerability-check-form">
        <h3 className="styling">Website URL</h3>
        <input
          type="text"
          placeholder="Enter website URL"
          value={websiteUrl}
          onChange={handleChangeWebsiteUrl}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVulnerabilityCheck}>Submit</button>
      </div>
    </div>
  );
};


// import React, { useState, useEffect } from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Line } from "react-chartjs-2";

// import "./App.css";

// import chartData from "/src/data/Advanced persistent_data_1.json";
// // import chartData from "/src/data/Backdoor_data_1.json";

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";

// export const App = () => {
//   const [organizationName, setOrganizationName] = useState("");
//   const [vulnerabilityData, setVulnerabilityData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // Track loading state
//   const [currentSection, setCurrentSection] = useState("home"); // New state for current section

//   const handleVulnerabilityCheck = async () => {
//     setIsLoading(true); // Set loading state to true before API call
//     if (!organizationName.trim()) {
//       setErrorMessage("Please enter your organization name.");
//       setIsLoading(false); // Set loading state to false after error
//       return;
//     }

//     setErrorMessage("");

//     try {
//       const encodedOrgName = encodeURIComponent(organizationName); // Encode for special characters
//       const response = await fetch(
//         `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodedOrgName}`
//       );

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("data:", data);
//       setVulnerabilityData(data.results); // Assuming vulnerabilities are in data.results
//     } catch (error) {
//       console.error("Error fetching vulnerabilities:", error);
//       setErrorMessage("An error occurred while fetching vulnerabilities.");
//     } finally {
//       setIsLoading(false); // Set loading state to false after API call finishes (regardless of success/failure)
//     }
//   };

//   const handleChangeOrganizationName = (event) => {
//     setOrganizationName(event.target.value);
//   };

//   const handleSectionChange = (section) => {
//     setCurrentSection(section); // Update current section state on click
//   };

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <div className="logo">Logo</div>
//         <div className="nav-links">
//           <a href="#" onClick={() => handleSectionChange("home")}>Home</a>
//           <a href="#" onClick={() => handleSectionChange("checkVulnerability")}>
//             Check Vulnerability
//           </a>
//           <a href="#">About</a>
//           <a href="#">Contact</a>
//         </div>
//       </nav>

//       {currentSection === "home" && (
//         // Content for the home section
//         <div className="home-content">
//           {/* Your home page content here */}
//           <div className="dataCards">
//         <div className="dataCard revenueCard">
//           <Line data={chartData.data} options={chartData.options} />
//         </div>
//       </div>
//         </div>
//       )}

//       {currentSection === "checkVulnerability" && (
//         <div className="vulnerability-check-form">
//           <h2>Organization Name</h2>
//           <input
//             type="text"
//             placeholder="Enter your organization name"
//             value={organizationName}
//             onChange={handleChangeOrganizationName}
//           />
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button onClick={handleVulnerabilityCheck}>Submit</button>
//         </div>
//       )}

//       {isLoading && ( // Display loading indicator while data is being fetched
//         <div className="loading-indicator">
//           <p>Fetching vulnerability data...</p>
//         </div>
//       )}

//       {vulnerabilityData && (
//         <div className="vulnerability-results">
//           <h2>Vulnerability Results</h2>
//           {vulnerabilityData.length === 0 ? (
//             <p>No vulnerabilities found.</p>
//           ) : (
            // <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            //   {/* Display the entire data object in JSON format */}
            //   {JSON.stringify(vulnerabilityData, null, 2)}
            // </p>
//           )}
//         </div>
//       )}
//       </div>
//   );
// };



