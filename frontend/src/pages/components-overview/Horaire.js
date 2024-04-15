// material-ui
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import FormulaireHoraire from 'components/formulaire/Horaire/Horaire';
import HoraireEdit from 'components/formulaire/Horaire/HoraireEdit';
import axios from 'axios'
import Swal from 'sweetalert2'
// // project import
// import ComponentSkeleton from './ComponentSkeleton';
// import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Jour = () => {
  const [donnees, setDonnees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/horaire`)
      .then((res) => res.json())
      .then((data) => {
        setDonnees(data);
      })
      .catch((error) => {
        console.error('Erreur de chargement des données:', error);
      });
  }, [donnees]);

  const handleFormSubmit = (formData, isUpdate = false) => {
    if (isUpdate) {
      const updatedData = donnees.map((item) => (item.id_horaire === formData.id_horaire ? formData : item));
      setDonnees(updatedData);
    } else {
      setDonnees([...donnees, formData]);
    }
    setShowAdd(false);
  };

  const handleUpdate = (item) => {
    setCurrentItem(item);
    setShowEdit(true);
};

const handleDelete = (id_horaire) => {
  Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32c637',
      cancelButtonColor: '#ec1c24',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
  }).then((result) => {
      if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/horaire/${id_horaire}`)
              .then(()=> {
            
                  const deleteData = donnees.filter(item => item.id_horaire !== id_horaire);
                  setDonnees(deleteData);
                  Swal.fire(
                      'Supprimé!',
                      'Horaire supprimé.',
                      'success'
                  );
              })
              .catch(() => {
             
                  Swal.fire(
                      'Erreur!',
                      'Une erreur est survenue lors de la suppression.',
                      'error'
                  );
              });
      }
  });
};

  return (
    <>
      <MainCard style={{ marginBottom: '20px' }}>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h1>LISTE DES HORAIRES</h1>
              </div>

              <div>
                <Button
                  variant="primary"
                  onClick={() => setShowAdd(true)}
                  style={{
                    marginBottom: '30px',
                    padding: '10px 20px', // Augmente le padding pour un bouton plus grand
                    fontSize: '1.25rem' // Augmente la taille du texte
                  }}
                >
                  ADD
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </MainCard>

      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajout de nouvelle horaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormulaireHoraire onSubmit={handleFormSubmit}/>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modification horaire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HoraireEdit item={currentItem} onSubmit={handleFormSubmit}/>
        </Modal.Body>
      </Modal>

      <MainCard>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th scope="col">ID HORAIRE</th>
                  <th scope="col">HEURE DEBUT</th>
                  <th scope="col">HEURE FIN</th>
                  <th scope="col">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {donnees.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id_horaire}</td>
                    <td>{item.heure_debut}</td>
                    <td>{item.heure_fin}</td>                  
                    <td>
                      <Button variant="primary" onClick={() => handleUpdate(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      {/* Bouton de suppression si nécessaire */}
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(item.id_horaire)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      {/* Bouton de suppression si nécessaire */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Jour;