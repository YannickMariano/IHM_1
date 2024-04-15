import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ParcourCombo({ onSelect }) {
  const [designParcours, setDesignParcours] = useState([]);
  const [selectedDesignParcour, setSelectedDesignParcour] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/parcour/');
      if (Array.isArray(response.data)) {
        // Assuming response.data is an array of objects with "design_parcour" and "id_parcour" fields
        setDesignParcours(response.data);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching design_parcour values:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedDesignParcourValue = event.target.value;
    setSelectedDesignParcour(selectedDesignParcourValue);

    const selectedParcour = designParcours.find((parcour) => parcour.design_parcour === selectedDesignParcourValue);

    if (selectedParcour) {
      console.log('Selected Design Parcour ID:', selectedParcour.id_parcour);
      onSelect(selectedParcour.id_parcour); // Pass the selected id_parcour to parent component
    } else {
      console.log('Selected Design Parcour ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="design_parcour">Select Design Parcour:</label>
      <select id="design_parcour" value={selectedDesignParcour} onChange={handleSelectChange}>
        <option value="">Parcours</option>
        {designParcours.map((parcour, index) => (
          <option key={index} value={parcour.design_parcour}>
            {parcour.design_parcour}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ParcourCombo;
