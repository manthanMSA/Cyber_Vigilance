import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import sectorsData from './sectorData.json';
import "./ThreatScore.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ThreatScore = () => {
  const [selectedSector, setSelectedSector] = useState('Education');
  const [selectedScore, setSelectedScore] = useState(66.55172414);
  const [sectorMessage, setSectorMessage] = useState('Securing student data through encryption, implementing web filtering solutions to block malicious websites, and regularly updating cybersecurity policies can enhance cybersecurity posture for the Education sector.');

  const handleSectorChange = (event) => {
    const sector = event.target.value;
    console.log(sector);
    setSelectedSector(sector);
    const sectorData = sectorsData.sectors.find((item) => item.sector === sector);
    if (sectorData) {
      setSelectedScore(sectorData.score);
      setSectorMessage(sectorData.message);
    } else {
      setSelectedScore(null);
      setSectorMessage('');
    }
  };

  const options = {
    circumference: 180,
    rotation: 270,
    cutout: '90%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 25, // Increase the borderWidth to increase thickness
        borderColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'], // Increase the borderWidth to increase thickness
      },
    },
  };

  const data = {
    datasets: [
      {
        data: [selectedScore || 0, 100 - (selectedScore || 0)],
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)'],
      },
    ],
  };

  // Function to display message based on score and sector
// Function to display message based on score and sector
// Function to display message based on score and sector
const getMessage = (score, sectorMessage) => {
  if (score < 50) {
    return (
      <ul className='alignleft display'>
       <li>Your organization's cybersecurity vulnerability score is relatively low. However, it's crucial to remain vigilant and implement robust cybersecurity measures to prevent potential cyberattacks.</li> 
       <li>{sectorMessage}</li> 
      </ul>
    );
  } else if (score >= 50 && score < 70) {
    return (
      <ul className='alignleft display'>
        <li>Your organization's cybersecurity vulnerability score indicates a moderate level of vulnerability. Consider enhancing your cybersecurity defenses by implementing additional security measures and conducting regular security assessments.</li>
        <li>{sectorMessage}</li>
      </ul>
    );
  } else{
    return (
      <ul className='alignleft display'>
        <li>Your organization's cybersecurity vulnerability score is high, indicating a significant risk of cyberattacks. It's imperative to prioritize cybersecurity measures, including advanced threat detection, incident response planning, and employee training, to mitigate potential threats effectively.</li>
        <li>{sectorMessage}</li>
      </ul>
    );
  } 
};



  return (
    <div className="threat-container">
          <div className='alignment1 explain'> 
        <p className='alignment'>Here we are using 2 columns in order to predict the threat score: </p>
        <p className='alignment'><b>Severity:</b> It considers all the Attack Types and ranks them in a scale from 1 to 5 based on their severity.</p>
        <p className='alignment'><b>Frequency_count:</b> This considers the frequency count of all the Attack_Types based on the Sector</p>
        <p className='alignment'>The formula used for <b>Threat Score</b> is: <b>(Severity*Frequency_count) / sum(Frequency_count)</b></p>
      </div>
      <div>
        <h2 className='spacing'>Select Sector:</h2>
        <select value={selectedSector} onChange={handleSectorChange}>
          <option value="">Select Sector</option>
          {sectorsData.sectors.map((sector, index) => (
            <option key={index} value={sector.sector}>
              {sector.sector}
            </option>
          ))}
        </select>
        {selectedScore !== null && (
          <div>
            <div className="doughnut" style={{ width: '300px', height: '300px' }}>
              <Doughnut className='display' data={data} options={options} />
              <h2>Threat Score: {selectedScore}</h2>
              
            </div>
            
            
          </div>
        )}
      </div>
      <div className='text '>
            <p className='aligning '>{getMessage(selectedScore, sectorMessage)}</p> {/* Display message based on score and sector */}
      </div>


    </div>

    
  );
};

export default ThreatScore;