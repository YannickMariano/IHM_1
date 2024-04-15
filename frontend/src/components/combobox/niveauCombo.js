import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NiveauCombo({ onSelect }) {
  const [designNiveaus, setDesignNiveaus] = useState([]);
  const [selectedDesignNiveau, setSelectedDesignNiveau] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/niveau/');
      if (Array.isArray(response.data)) {
        // Assuming response.data is an array of objects with "design_niveau" and "id_niveau" fields
        setDesignNiveaus(response.data);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching design_niveau values:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedDesignNiveauValue = event.target.value;
    setSelectedDesignNiveau(selectedDesignNiveauValue);

    const selectedNiveau = designNiveaus.find((niveau) => niveau.design_niveau === selectedDesignNiveauValue);

    if (selectedNiveau) {
      console.log('Selected Design Niveau ID:', selectedNiveau.id_niveau);
      onSelect(selectedNiveau.id_niveau); // Pass the selected id_niveau to parent component
    } else {
      console.log('Selected Design Niveau ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="design_niveau">Select Design Niveau:</label>
      <select id="design_niveau" value={selectedDesignNiveau} onChange={handleSelectChange}>
        <option value="">Niveaux</option>
        {designNiveaus.map((niveau, index) => (
          <option key={index} value={niveau.design_niveau}>
            {niveau.design_niveau}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NiveauCombo;
