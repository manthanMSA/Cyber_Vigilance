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
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [vulnerabilityData, setVulnerabilityData] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false); 

//   // const handleWebsiteUrl = async (url) => {
//   //   if (!url.trim()) {
//   //     setErrorMessage("Please enter a website URL.");
//   //     return;
//   //   }

//   //   console.log("Executing Bash file with URL:", url);

//   // };

//   const handleVulnerabilityCheck = async () => {
//     setIsLoading(true); 
//     if (!organizationName.trim()) {
//       setErrorMessage("Please enter your organization name.");
//       setIsLoading(false); 
//       return;
//     }

//     setErrorMessage("");

//     try {
//       const encodedOrgName = encodeURIComponent(organizationName); 
//       const response = await fetch(
//         `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodedOrgName}`
//       );

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       const actualData = data.vulnerabilities[0].cve.metrics.cvssMetricV2[0];
//       // console.log("data:",actualData);
//       setVulnerabilityData(actualData); 
//       console.error("Error fetching vulnerabilities:", error);
//       setErrorMessage("An error occurred while fetching vulnerabilities.");
//     } finally {
//       setIsLoading(false); 
//     }
//   };

//   // useEffect(() => {
//   //   console.log("vulnerabilityData after update:", vulnerabilityData);
//   // }, [vulnerabilityData]);

//   const handleChangeOrganizationName = (event) => {
//     setOrganizationName(event.target.value);
//   };

//   const handleChangeWebsiteUrl = (event) => {
//     setWebsiteUrl(event.target.value);
//   };

//   // useEffect(() => {
//   //   if (!organizationName) {
//   //     setVulnerabilityData(null);
//   //     setErrorMessage("");
//   //   }
//   // }, [organizationName]);

//   useEffect(() => {
//     if (!organizationName || !websiteUrl) {
//       setVulnerabilityData(null);
//       setErrorMessage("");
//     }
//   }, [organizationName, websiteUrl]);

//   return (
//     <div className="App">
//       <nav className="navbar">
//         <div className="logo">Logo</div>
//         <div className="nav-links">
//           <a href="#">Home</a>
//           <a href="#">About</a>
//           <a href="#">Contact</a>
//         </div>
//       </nav>

//       <div className="dataCards">
//         <div className="dataCard revenueCard">
//           <Line data={chartData.data} options={chartData.options} />
//         </div>
//       </div>

//       <div className="vulnerability-check-form">
//         <h3>Organization Name</h3>
//         <input
//           type="text"
//           placeholder="Enter your organization name"
//           value={organizationName}
//           onChange={handleChangeOrganizationName}
//         />
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <button onClick={handleVulnerabilityCheck}>Submit</button>
//       </div>

//       {isLoading && ( 
//         <div className="loading-indicator">
//           <p>Fetching vulnerability data...</p>
//         </div>
//       )}

//       {vulnerabilityData && (
//   <div className="vulnerability-results">
//     <h2>Vulnerability Results:</h2>
//     <table className="vulnerability-table"> 
//       <thead>
//         <tr>
//           <th>Metric</th>
//           <th>Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Impact Score</td>
//           <td>{vulnerabilityData.impactScore}</td>
//         </tr>
//         <tr>
//           <td>Base Severity</td>
//           <td>{vulnerabilityData.baseSeverity}</td>
//         </tr>
//         <tr>
//           <td>Exploitability Score</td>
//           <td>{vulnerabilityData.exploitabilityScore}</td>
//         </tr>
//         <tr>
//           <td>Base Score</td>
//           <td>{vulnerabilityData.cvssData.baseScore}</td>
//         </tr>
//         <tr>
//           <td>Availability Impact</td>
//           <td>{vulnerabilityData.cvssData.availabilityImpact}</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// )}

// {/* <div className="vulnerability-check-form">

//         <h3 className="styling">Website URL</h3>
//         <input
//           type="text"
//           placeholder="Enter website URL"
//           value={websiteUrl}
//           onChange={handleChangeWebsiteUrl}
//         />
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <button onClick={handleVulnerabilityCheck}>Submit</button>
//       </div> */}
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from 'axios';

import "./App.css";

import chartData from "/src/data/Advanced persistent_data_1.json";

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
  const [urlCheckResult, setUrlCheckResult] = useState("");
  const [pulsesData, setpulsesData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "organizationName") {
      setOrganizationName(value);
    } else if (name === "websiteUrl") {
      setWebsiteUrl(value);
    }
    setErrorMessage(""); 
  };

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
      setVulnerabilityData(actualData);
    } catch (error) {
      console.error("Error fetching vulnerabilities:", error);
      setErrorMessage("An error occurred while fetching vulnerabilities.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlCheck = async () => {
    setIsLoading(true);
  
    const API_KEY = '5673445b06b8618e5dd1222bb6b55cd3fcb2421f2f65aee49f8048bad4c1155f';
  
    if (!websiteUrl.trim()) {
      setErrorMessage("Please enter a website URL.");
      setIsLoading(false);
      return;
    }
  
    const url = `https://otx.alienvault.com/api/v1/indicators/domain/${websiteUrl}/general`; // Dynamic URL
  
    const headers = { 'X-OTX-API-KEY': API_KEY };
  
    try {
      const response = await axios.get(url, headers);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data.pulse_info);
        setpulsesData(data.pulse_info);
        if (data['pulse_info']['count'] > 0) {
          setUrlCheckResult("The URL is potentially malicious.");
        } else {
          setUrlCheckResult("The URL is not identified as malicious according to AlienVault OTX data.");
        }
      } else {
        console.error("Error:", response.status);
        setErrorMessage("Error checking URL. Please check your API key or network connection.");
      }
    } catch (error) {
      console.error("Error checking URL:", error);
      setErrorMessage("Error checking URL. Please check your API key or network connection.");
    } finally {
      setIsLoading(false);
    }
  };

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

<h4>Impact Score:</h4>

<p>Represents the potential negative impact a successful exploit of a vulnerability could have on a system or organization. This impact is usually measured across three main categories: Confidentiality, Integrity, and Availability (CIA triad).
Higher impact scores indicate a more severe potential consequence.</p>

<h4>Base Severity:</h4>

<p>Reflects the inherent severity of a vulnerability based on its characteristics, independent of exploitability or specific environments.
Common scoring systems like CVSS (Common Vulnerability Scoring System) use a numerical scale (e.g., 0.0-10.0) to represent base severity.</p>
<h4>Exploitability Score:</h4>

<p>Assesses the ease with which a vulnerability can be exploited. Factors like required access level, complexity of attack, and availability of exploits are considered.
A higher exploitability score suggests a more readily exploitable vulnerability.</p>
<h4>Base Score:</h4>

<p>Often refers to the CVSS base score, calculated based on the base severity and exploitability scores. It reflects the overall severity of the vulnerability independent of specific environments.</p>
<h4>Availability Impact:</h4>

<p>Specifically focuses on the potential impact on a system's availability if the vulnerability is exploited. This could involve complete system outages, data loss, or service disruptions.</p>
<h4>Pulse Count (OTX Specific):</h4>

<p>In the context of AlienVault OTX (Open Threat Exchange), a pulse count refers to the number of indicators (URLs, domains, file hashes, etc.) associated with a specific pulse. Pulses are user-created collections of indicators related to threats or threat actors.</p>
<h4>TLP (Traffic Light Protocol):</h4>

<p>A standardized framework for classifying information based on its disclosure restrictions. Different colors (e.g., white, green, amber, red) represent increasing levels of sensitivity.</p>
<h4>CVE (Common Vulnerabilities and Exposures):</h4>

<p>A globally recognized system for identifying and cataloging security vulnerabilities. Each CVE ID uniquely identifies a specific vulnerability.</p>
<h4>Here's how these terms might be used together:</h4>

<p>A vulnerability might have a high impact score due to its potential to disrupt critical systems (availability impact).
<p>The base severity could be significant based on the vulnerability's characteristics.</p>
<p>A low exploitability score might indicate a less readily exploitable vulnerability.</p>
<p>The combined base score would then provide a general severity level.</p>
<p>Information about the vulnerability might be shared with a TLP level of green (publicly available but limited distribution recommended).</p>
      </p>

      <div className="vulnerability-check-form">
        <h3>Organization Name</h3>
        <input
          type="text"
          placeholder="Enter your organization name"
          value={organizationName}
          name="organizationName"
          onChange={handleChange}
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

      <div className="url-check-form">
        <h3>Website URL</h3>
        <input
          type="text"
          placeholder="Enter a website URL"
          value={websiteUrl}
          name="websiteUrl"
          onChange={handleChange}
        />
        <button onClick={handleUrlCheck} disabled={isLoading}>
          {/* {isLoading ? "Checking..." : "Check URL"} */}
        </button>
        {urlCheckResult && (
          <div className="url-check-result">
            {urlCheckResult}
          </div>
        )}
      </div>

      {pulsesData && (
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
                <td>Pulse Count</td>
                <td>{pulsesData.count}</td>
              </tr>
              <tr>
                <td>TLP</td>
                <td>{pulsesData.pulses[0].TLP}</td>
              </tr>
              <tr>
                <td>Common Vulnerabilities and Exposures</td>
                <td>{pulsesData.pulses[0].indicator_type_counts.CVE}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};


