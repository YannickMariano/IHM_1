import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalleCombo({ onSelect }) {
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/salle/designation');
      if (Array.isArray(response.data)) {
        // Assuming response.data is an array of objects with "designation" and "idSalle" fields
        setSalles(response.data);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching salles:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedSalleValue = event.target.value;
    setSelectedSalle(selectedSalleValue);

    const selectedSalleObject = salles.find((salle) => salle.designation === selectedSalleValue);

    if (selectedSalleObject) {
      console.log('Selected Salle ID:', selectedSalleObject.idSalle);
      onSelect(selectedSalleObject.idSalle); // Pass the selected idSalle to parent component
    } else {
      console.log('Selected Salle ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="salle">Select Salle:</label>
      <select id="salle" value={selectedSalle} onChange={handleSelectChange}>
        <option value="">Salle</option>
        {salles.map((salle, index) => (
          <option key={index} value={salle.designation}>
            {salle.designation}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SalleCombo;
