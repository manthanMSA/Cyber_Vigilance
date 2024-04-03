import React, { useState, useEffect } from 'react';

const mitigationInfo = [
  {
    attackType: 'SQL Injection',
    description: 'SQL injection is a cyberattack that manipulates SQL statements to trick a server into disclosing sensitive data or executing malicious code. Mitigation strategies include using prepared statements, parameterized queries, and input validation.',
  },
  // Add more attack types and descriptions here
];

const MitigationInfo = () => {
  const [selectedAttack, setSelectedAttack] = useState('');

  useEffect(() => {
    // Simulate fetching mitigation info from an API (replace with your logic)
    const fetchData = async () => {
      const response = await fetch('/api/mitigation-info'); // Replace with your API endpoint
      const data = await response.json();
      setSelectedAttack(data[0].attackType); // Set initial selected attack
    };
    fetchData();
  }, []);

  const handleAttackChange = (event) => {
    setSelectedAttack(event.target.value);
  };

  const selectedInfo = mitigationInfo.find(
    (info) => info.attackType === selectedAttack
  );

  return (
    <div className="mitigation-info">
      <h2>Mitigation Information</h2>
      <select value={selectedAttack} onChange={handleAttackChange}>
        <option value="">Select Attack Type</option>
        {mitigationInfo.map((info) => (
          <option key={info.attackType} value={info.attackType}>
            {info.attackType}
          </option>
        ))}
      </select>
      {selectedInfo && (
        <div className="description">
          <h3>{selectedInfo.attackType}</h3>
          <p>{selectedInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default MitigationInfo;
