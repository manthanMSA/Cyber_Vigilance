import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';
import './Dashboard.css'

function Dashboard1() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedAttackType, setSelectedAttackType] = useState('');
  const [years, setYears] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [attackTypes, setAttackTypes] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [countryIncidentChartData, setCountryIncidentChartData] = useState([]); // Define countryIncidentChartData here
  const [chartLayout, setChartLayout] = useState({
    width: 600,
    height: 400,
    title: 'Attack Type Distribution'
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateChartData();
  }, [filteredData]);

  const fetchData = async () => {
    try {
      const response = await fetch('new_final.csv');
      const text = await response.text();
      const result = Papa.parse(text, { header: true });
      setData(result.data);

      const uniqueYears = [...new Set(result.data.map(item => item.Year))];
      const uniqueSectors = [...new Set(result.data.map(item => item.Sector))];
      const uniqueAttackTypes = [...new Set(result.data.map(item => item['Attack Type']))];

      setYears(uniqueYears);
      setSectors(uniqueSectors);
      setAttackTypes(uniqueAttackTypes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const applyFilters = () => {
    const filtered = data.filter(item => {
      return (
        (!selectedYear || item.Year === selectedYear) &&
        (!selectedSector || item.Sector === selectedSector) &&
        (!selectedAttackType || item['Attack Type'] === selectedAttackType)
      );
    });
    setFilteredData(filtered);
  };

  const updateChartData = () => {
    const attackTypeCounts = {};
    filteredData.forEach(item => {
      const attackType = item['Attack Type'];
      attackTypeCounts[attackType] = (attackTypeCounts[attackType] || 0) + 1;
    });
    const chartData = [{
      type: 'bar',
      x: Object.keys(attackTypeCounts),
      y: Object.values(attackTypeCounts),
    }];
    setChartData(chartData);

    // Update country-wise incident count chart data
    const countryIncidentCounts = {};
    filteredData.forEach(item => {
      const country = item['Country'];
      countryIncidentCounts[country] = (countryIncidentCounts[country] || 0) + 1;
    });
    const countryIncidentChartData = [{
      type: 'bar',
      x: Object.keys(countryIncidentCounts),
      y: Object.values(countryIncidentCounts),
    }];
    setCountryIncidentChartData(countryIncidentChartData);
  };

  return (

    <div className='container'>
      <div>
      <iframe title="Barclays" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=ab41845d-b7ad-4f5e-813b-6332895832a1&autoAuth=true&ctid=0e6a03b4-28b9-4d7f-ac3c-38163cd83600" frameborder="0" allowFullScreen="true"></iframe>      </div>

      {/* <h1>Cybersecurity Incident Dashboard</h1> */}
      <div className='filters'>
        <h2 className='filters select'>Filters</h2>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
          <option value="">Select Sector</option>
          {sectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
        <select value={selectedAttackType} onChange={e => setSelectedAttackType(e.target.value)}>
          <option value="">Select Attack Type</option>
          {attackTypes.map(attackType => (
            <option key={attackType} value={attackType}>{attackType}</option>
          ))}
        </select>
        <button className='filters button' onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="chart-section">
        <div className="chart-container">
          <h2 className="chart-section h2">Attack Type Distribution</h2>
          <Plot className="chart-section2 chart-section21" data={chartData} layout={chartLayout} />
        </div>
        <div className="chart-container">
          <h2 className="chart-section h2">Country-wise Incident Count</h2>
          <Plot className="chart-section2 chart-section22" data={countryIncidentChartData} layout={chartLayout} />
        </div>
      </div>

    </div>
  );
}

export default Dashboard1;