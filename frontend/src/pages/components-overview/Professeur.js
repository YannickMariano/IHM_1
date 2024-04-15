// material-ui
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome/index';
import FormulaireProfesseur from 'components/formulaire/Professeur/Professeur';
import ProfesseurEdit from 'components/formulaire/Professeur/ProfesseurEdit';
import axios from 'axios';
import Swal from 'sweetalert2';
// // project import
// import ComponentSkeleton from './ComponentSkeleton';
// import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Professeur = () => {
  const [donnees, setDonnees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/prof/')
      .then((res) => res.json())
      .then((data) => {
        setDonnees(data);
      })
      .catch((error) => {
        console.error('Erreur de chargement des données:', error);
      });
  }, []);

  const handleFormSubmit = (formData, isUpdate = false) => {
    if (isUpdate) {
      const updatedData = donnees.map((item) => (item.idProf === formData.idProf ? formData : item));
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

  const handleDelete = (idProf) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32c637',
      cancelButtonColor: '#ec1c24',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
            .delete(`http://localhost:5000/prof/${idProf}`)
            .then(() => {
                const updatedData = donnees.filter((item) => item.idProf !== idProf);
                setDonnees(updatedData);
                Swal.fire('Supprimé!', 'Le professeur a été supprimé.', 'success');
            })
            .catch(() => {
                Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression.', 'error');
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
                <h1>LISTE DES PROFESSEURS</h1>
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
          <Modal.Title>Ajout de nouveau Professeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormulaireProfesseur onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modification de professeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfesseurEdit item={currentItem} onSubmit={handleFormSubmit} />
        </Modal.Body>
      </Modal>

      <MainCard>
        <Grid >
          <Grid>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection:'row',
            justifyContent: 'flex-start',
            gap: '20px'
          }}>
          {donnees.map((professeur, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%', // prenez toute la largeur disponible
              maxWidth: '575px', // largeur maximale de la carte
              backgroundColor: '#fff', // arrière-plan blanc
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // légère ombre portée pour le relief
              borderRadius: '10px', // bords arrondis
              margin: '10px',
              overflow: 'hidden' // pour s'assurer que rien ne dépasse du bord arrondi
            }}>
              {/* <img src={professeur.profile_image_path} alt={professeur.nom} style={{
                width: '150px', // largeur fixe pour l'image
                height: '150px', // hauteur fixe pour l'image
                objectFit: 'cover', // assurez-vous que l'image couvre la zone dédiée
                borderRadius: '10px 0 0 10px' // arrondit les bords gauche de l'image
              }} /> */}

      <div style={{
        padding: '20px', // espace à l'intérieur de la carte
        flexGrow: 1 // permet au contenu de remplir l'espace disponible
      }}>
        <h5 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{professeur.nom}</h5>
        <p style={{ margin: '0' }}>{professeur.email}</p>
        <p style={{ margin: '0' }}>
        {professeur.mdp.split('').map(() => '*').join('')}
        </p>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#f5f5f5', // arrière-plan gris pour les actions
        borderRadius: '0 10px 10px 0' // arrondit les bords droits du conteneur d'actions
      }}>
       <Button onClick={() => handleUpdate(professeur)} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                        <FontAwesomeIcon icon={faEdit} style={{ color: '#007bff' }}/>
                      </Button>
        <Button onClick={() => handleDelete(professeur.idProf)} style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
                        <FontAwesomeIcon icon={faTrash} style={{color:'#FF0000' }}/>
          </Button>
      </div>
    </div>
  ))}
</div>


          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Professeur;