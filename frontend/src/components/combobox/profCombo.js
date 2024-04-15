import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfCombo({ onSelect }) {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/prof/');
      if (Array.isArray(response.data)) {
        // Assuming response.data is an array of objects with "idProf", "nom", and "prenom" fields
        setProfessors(response.data);
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedProfessorValue = event.target.value;
    setSelectedProfessor(selectedProfessorValue);

    const selectedProfessorObject = professors.find((prof) => `${prof.nom} ${prof.prenom}` === selectedProfessorValue);

    if (selectedProfessorObject) {
      console.log('Selected Professor ID:', selectedProfessorObject.idProf);
      onSelect(selectedProfessorObject.idProf); // Pass the selected idProf to parent component
    } else {
      console.log('Selected Professor ID not found');
    }
  };

  return (
    <div>
      <label htmlFor="professor">Select Professor:</label>
      <select id="professor" value={selectedProfessor} onChange={handleSelectChange}>
        <option value="">Professeur</option>
        {professors.map((prof, index) => (
          <option key={index} value={`${prof.nom} ${prof.prenom}`}>
            {`${prof.nom} ${prof.prenom}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProfCombo;
