import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

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
      const response = await fetch('finall.csv');
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
    <div>
      <h1>Cybersecurity Incident Dashboard</h1>

      <div>
        <h2>Filters</h2>
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
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <div>
        <h2>Attack Type Distribution</h2>
        <Plot
          data={chartData}
          layout={chartLayout}
        />
      </div>
      
      <div>
        <h2>Country-wise Incident Count</h2>
        <Plot
          data={countryIncidentChartData}
          layout={chartLayout}
        />
      </div>

      <div>
        <button>Show Mitigation Techniques</button>
        {/* Display mitigation techniques if button is clicked */}
      </div>
    </div>
  );
}

export default Dashboard1;