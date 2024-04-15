import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JourCombo({ onSelect }) {
  const [designJours, setDesignJours] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jour/list/');
      // Filter out null values
      const filteredDesignJours = response.data.filter(item => item.design_jour !== null);
      setDesignJours(filteredDesignJours);
    } catch (error) {
      console.error('Error fetching design_jour values:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedDesignJourValue = event.target.value;

    const selectedJour = designJours.find((jour) => jour.design_jour === selectedDesignJourValue);

    if (selectedJour) {
      console.log('Selected Jour ID:', selectedJour.id_jour);
      onSelect(selectedJour.id_jour); // Pass the selected id_jour to parent component
    } else {
      console.log('Selected Jour ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="design_jour">Select Design Jour:</label>
      <select id="design_jour" onChange={handleSelectChange}>
        <option value="">Jour</option>
        {designJours.map((jour, index) => (
          <option key={index} value={jour.design_jour}>
            {jour.design_jour}
          </option>
        ))}
      </select>
    </div>
  );
}

export default JourCombo;
