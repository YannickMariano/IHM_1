import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatiereCombo from '../../components/combobox/matiereCombo';
import NiveauCombo from '../../components/combobox/niveauCombo';
import ParcourCombo from '../../components/combobox/parcoursCombo';
import ProfCombo from '../../components/combobox/profCombo';
import SalleCombo from '../../components/combobox/salleCombo';
import JourCombo from '../../components/combobox/jourCombo';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Swal from 'sweetalert2';

const EDT = () => {
  const [tableData, setTableData] = useState([]);


  /////////////////Debut pour changer d'heure///////////////
  const handleStartTimeChange = (e) => {
    let value = e.target.value;
    // Validate the input
    if (isValidTime(value)) {
      setStartTime(value);
    }
  };

  const handleEndTimeChange = (e) => {
    let value = e.target.value;
    // Validate the input
    if (isValidTime(value)) {
      setEndTime(value);
    }
  };

  // Function to check if a time is valid (between 7:30 and 18:00)
  const isValidTime = (time) => {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time) && time >= "07:30" && time <= "18:00";
  };
  ///////////////////Fin pour changer d'heure////////////////

  const fetchMatiereDesignation = async (idMatiere) => {
    try {
      const response = await axios.get(`http://localhost:5000/matiere/${idMatiere}`);
      return response.data.designmat;
    } catch (error) {
      console.error(`Error fetching designmat for Matiere ID ${idMatiere}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  const fetchNiveauDesignation = async (idNiveau) => {
    try {
      const response = await axios.get(`http://localhost:5000/niveau/${idNiveau}`);
      return response.data.design_niveau;
    } catch (error) {
      console.error(`Error fetching design_niveau for Niveau ID ${idNiveau}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  const fetchParcourDesignation = async (idParcour) => {
    try {
      const response = await axios.get(`http://localhost:5000/parcour/${idParcour}`);
      return response.data.design_parcour;
    } catch (error) {
      console.error(`Error fetching design_parcour for Parcour ID ${idParcour}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  const fetchSalleDesignation = async (idSalle) => {
    try {
      const response = await axios.get(`http://localhost:5000/salle/${idSalle}`);
      return response.data.designation;
    } catch (error) {
      console.error(`Error fetching designation for Salle ID ${idSalle}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  const fetchJourDesignation = async (idJour) => {
    try {
      const response = await axios.get(`http://localhost:5000/jour/search/${idJour}`);
      return response.data.design_jour;
    } catch (error) {
      console.error(`Error fetching design_jour for Jour ID ${idJour}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  const fetchProfDesignation = async (idProf) => {
    try {
      const response = await axios.get(`http://localhost:5000/prof/${idProf}`);
      const { nom, prenom } = response.data;
      return `${nom} ${prenom}`;
    } catch (error) {
      console.error(`Error fetching designation for Prof ID ${idProf}:`, error);
      return 'Unknown'; // Default value if fetch fails
    }
  };

  useEffect(() => {
    const fetchDataWithDesignation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/organiser/');
        const newData = await Promise.all(
          response.data.map(async (row) => {
            const designationMatiere = await fetchMatiereDesignation(row.id_matiere);
            const designationNiveau = await fetchNiveauDesignation(row.id_niveau);
            const designationParcour = await fetchParcourDesignation(row.id_parcour);
            const designationSalle = await fetchSalleDesignation(row.idSalle);
            const designationJour = await fetchJourDesignation(row.id_jour);
            const designationProf = await fetchProfDesignation(row.idProf);
            return { ...row, designmat: designationMatiere, design_niveau: designationNiveau, design_parcour: designationParcour, designation_salle: designationSalle, design_jour: designationJour, designation_prof: designationProf };
          })
        );
        setTableData(newData);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchDataWithDesignation();
  }, []);

  const [matiereId, setMatiereId] = useState('');
  const [niveauId, setNiveauId] = useState('');
  const [parcourId, setParcourId] = useState('');
  const [profId, setProfId] = useState('');
  const [salleId, setSalleId] = useState('');
  const [jourId, setJourId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedIds, setSelectedIds] = useState({});

  // Function to fetch and display selected IDs
  const fetchSelectedIds = () => {
    setSelectedIds({
      id_matiere: matiereId,
      id_niveau: niveauId,
      id_parcour: parcourId,
      idProf: profId,
      idSalle: salleId,
      id_jour: jourId,
      heure_debut: startTime,
      heure_fin: endTime,
    });
  };

  const handleInsert = async () => {
    try {
      // Validate selected values
      if (!matiereId || !niveauId || !parcourId || !profId || !salleId || !jourId || !startTime || !endTime) {
        console.error('Please fill in all fields');
        return;
      }

      // Prepare the data for the POST request
      const data = {
        id_matiere: selectedIds.id_matiere,
        id_niveau: selectedIds.id_niveau,
        id_parcour: selectedIds.id_parcour,
        idProf: selectedIds.idProf,
        idSalle: selectedIds.idSalle,
        id_jour: selectedIds.id_jour,
        heure_debut: selectedIds.heure_debut,
        heure_fin: selectedIds.heure_fin,
      };

      console.log('Inserting data:', data);

      // Axios POST request to the "organiser" endpoint
      const response = await axios.post('http://localhost:5000/organiser/', data);

      console.log('Response:', response.data);

      // Show success message with Swal
      Swal.fire({
        icon: 'success',
        title: 'Data Inserted Successfully!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error('Error inserting:', error);
      // Show error message with Swal here
    }
  };

  const timeSlots = [
    '7:30',  '9:00',  '10:30',
    '12:00', '13:00', '14:30',
    '15:00',  '16:30', '18:00'
  ];

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <div>
      <MatiereCombo onSelect={(id) => setMatiereId(id)} />
      <NiveauCombo onSelect={(id) => setNiveauId(id)} />
      <ParcourCombo onSelect={(id) => setParcourId(id)} />
      <ProfCombo onSelect={(id) => setProfId(id)} />
      <SalleCombo onSelect={(id) => setSalleId(id)} />
      <JourCombo onSelect={(id) => setJourId(id)} />
      <div>
        <label htmlFor="start-time">Start Time:</label>
        <input
          type="text"
          id="start-time"
          value={startTime}
          placeholder="Enter Start Time (HH:MM)"
          onChange={handleStartTimeChange}
        />
      </div>
      <div>
        <label htmlFor="end-time">End Time:</label>
        <input
          type="text"
          id="end-time"
          value={endTime}
          placeholder="Enter End Time (HH:MM)"
          onChange={handleEndTimeChange}
        />
      </div>
      <button onClick={fetchSelectedIds}>Get Selected IDs</button>

      {/* Display selected IDs */}
      <div style={{ marginTop: '20px' }}>
        <h2>Selected IDs:</h2>
        <ul>
          {Object.entries(selectedIds).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table className="table-bordered">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {days.map((day, index) => (
                <TableCell key={index} className="border-cell">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((timeSlot, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" className="border-cell">
                  {timeSlot}
                </TableCell>
                {days.map((day, index) => (
                  <TableCell key={index} className="border-cell"></TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Insert Data Button */}
      <button onClick={handleInsert}>Insert Data</button>

      {/* Organiser Table */}
      <h2>Organiser Table</h2>
      <TableContainer component={Paper}>
        <Table className="table-bordered">
          <TableHead>
            <TableRow>
              <TableCell>Designation Matiere</TableCell>
              <TableCell>Designation Niveau</TableCell>
              <TableCell>Designation Parcour</TableCell>
              <TableCell>Designation Salle</TableCell>
              <TableCell>Designation Jour</TableCell>
              <TableCell>Designation Prof</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.designmat}</TableCell>
                <TableCell>{row.design_niveau}</TableCell>
                <TableCell>{row.design_parcour}</TableCell>
                <TableCell>{row.designation_salle}</TableCell>
                <TableCell>{row.design_jour}</TableCell>
                <TableCell>{row.designation_prof}</TableCell>
                <TableCell>{row.heure_debut}</TableCell>
                <TableCell>{row.heure_fin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EDT;
