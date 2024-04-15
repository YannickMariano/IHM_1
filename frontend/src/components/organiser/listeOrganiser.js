// import { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const FormulaireSalle = () => {
//   const [prof, setProf] = useState([])
//   const [salle, setSalle] = useState([])
//   const [matiere, setMatiere] = useState([])
//   const [niveau, setNiveau] = useState([])
//   const [parcours, setParcours] = useState([])
//   const [jour, setJour] = useState([])

//   const resetData = () => {
//     setJour('')
//     setMatiere('')
//     setNiveau('')
//     setParcours('')
//     setProf('')
//     setSalle('')
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Demandez confirmation avant de soumettre
//     Swal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Vous êtes sur le point d'ajouter une nouvelle salle!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#32c637',
//       cancelButtonColor: '#ec1c24',
//       confirmButtonText: 'Oui, ajoutez-la!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const data = {
//          id_niveau: niveau,
//          id_prof: prof,
//          id_jour: jour,
//          id_parcours: parcours,
//          id_organiser: salle,
//          id_matiere: matiere
//         };
//         resetData();
//         axios
//           .post('http://localhost:3000/Organiser/createOrganiser', data)
//           .then(() => {
//             Swal.fire('Ajouté!', 'La salle a été ajoutée avec succès.', 'success');

//             // Ici, vous pouvez également gérer la réinitialisation du formulaire ou la mise à jour de l'état global de l'application si nécessaire
//           })
//           .catch(() => {
//             Swal.fire('Erreur!', 'La création de salle a échoué.', 'error');
//           });
//       }
//     });
//   };

//   return (
//     <>
//       <div>
//         {/* <h3>Ajouter un nouveau client</h3> */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleFormControlInput1" className="form-label">
//               Salle
//             </label>
//             <input type="text" className="form-control" onChange={(e) => setDesignation(e.target.value)} />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="exampleFormControlInput1" className="form-label">
//               Occupé
//             </label>
//             <input
//               type="checkbox"
//               checked={estOccuper} // L'état actuel contrôle si la case est cochée
//               onChange={handleCheckboxChange} // Met à jour l'état quand l'utilisateur coche/décoche
//               style={{ marginLeft: '10px' }}
//             />
//           </div>

//           <button className="btn btn-primary">Valider</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default FormulaireSalle;

// material-ui
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import FormulaireOrganiser from './formulaireOrganiser';
import { Modal, Button } from 'react-bootstrap';
// // project import
// import ComponentSkeleton from './ComponentSkeleton';
// import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Organiser = () => {
  const [donnees, setDonnees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/Organiser/listOrganiser')
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
      const updatedData = donnees.map((item) => (item.id_organiser === formData.id_organiser ? formData : item));
      setDonnees(updatedData);
    } else {
      setDonnees([...donnees, formData]);
    }
    // setShowAdd(false);
  };

//   const handleUpdate = (item) => {
//     setCurrentItem(item);
//     setShowEdit(true);
// };

// const handleDelete = (id_organiser) => {
//   Swal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Vous ne pourrez pas revenir en arrière!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#32c637',
//       cancelButtonColor: '#ec1c24',
//       confirmButtonText: 'Oui, supprimez-le!',
//       cancelButtonText: 'Annuler'
//   }).then((result) => {
//       if (result.isConfirmed) {
//           axios.delete(`http://127.0.0.1:3000/Salle/deleteSalle/${id_organiser}`)
//               .then(()=> {
//                   const updatedData = donnees.filter(item => item.id_organiser !== id_organiser);
//                   setDonnees(updatedData);
//                   Swal.fire(
//                       'Supprimé!',
//                       'La salle a été supprimée.',
//                       'success'
//                   );
//               })
//               .catch(() => {
//                   Swal.fire(
//                       'Erreur!',
//                       'Une erreur est survenue lors de la suppression.',
//                       'error'
//                   );
//               });
//       }
//   });
// };

  return (
    <>
      <MainCard style={{ marginBottom: '20px' }}>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <h1>LISTE DES ORGANISER</h1>
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
          <Modal.Title>Ajout de nouvelle salle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormulaireOrganiser onSubmit={handleFormSubmit}/>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modification de salle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SalleEdit item={currentItem} onSubmit={handleFormSubmit}/>
        </Modal.Body>
      </Modal> */}

      <MainCard>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th scope="col">PROFESSEUR</th>
                  <th scope="col">MATIERE</th>
                  <th scope="col">SALLE</th>
                  <th scope="col">PARCOURS</th>
                  <th scope="col">NIVEAU</th>
                  <th scope="col">JOUR</th>
                  <th scope="col">HEURE DEBUT</th>
                  <th scope="col">HEURE FIN</th>
                </tr>
              </thead>
              <tbody>
                {donnees.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id_prof}</td>
                    <td>{item.id_matiere}</td>
                    <td>{item.id_salle}</td>
                    <td>{item.id_parcours}</td>
                    <td>{item.id_niveau}</td>
                    <td>{item.id_jour}</td>
                    <td>{item.heure_debut}</td>
                    <td>{item.heure_fin}</td>
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

export default Organiser;
