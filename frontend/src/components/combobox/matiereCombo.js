import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MatiereCombo({ onSelect }) {
  const [designmats, setDesignmats] = useState([]);
  const [selectedDesignmat, setSelectedDesignmat] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/matiere/');
      setDesignmats(response.data);
    } catch (error) {
      console.error('Error fetching designmat values:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedDesignmatValue = event.target.value;
    setSelectedDesignmat(selectedDesignmatValue);

    const selectedMatiere = designmats.find((matiere) => matiere.designmat === selectedDesignmatValue);

    if (selectedMatiere) {
      console.log('Selected Designmat ID:', selectedMatiere.id_matiere);
      onSelect(selectedMatiere.id_matiere); // Pass the selected id_matiere to parent component
    } else {
      console.log('Selected Designmat ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="designmat">Select Designmat:</label>
      <select id="designmat" value={selectedDesignmat} onChange={handleSelectChange}>
        <option value="">Matiere</option>
        {designmats.map((matiere, index) => (
          <option key={index} value={matiere.designmat}>
            {matiere.designmat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MatiereCombo;
