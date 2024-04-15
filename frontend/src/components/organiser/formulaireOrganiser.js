import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProfCombo from 'components/combobox/profCombo';
import MatiereCombo from 'components/combobox/matiereCombo';
import JourCombo from 'components/combobox/jourCombo';
import NiveauCombo from 'components/combobox/niveauCombo';
import ParcoursCombo from 'components/combobox/parcoursCombo';
import SalleCombo from 'components/combobox/salleCombo';

const FormulaireOrganiser = () => {
  const [prof, setProf] = useState([]);
  const [salle, setSalle] = useState([]);
  const [matiere, setMatiere] = useState([]);
  const [niveau, setNiveau] = useState([]);
  const [parcours, setParcours] = useState([]);
  const [jour, setJour] = useState({});
  const [heure_debut, setHeureDebut] = useState('');
  const [heure_fin, setHeureFin] = useState('');

  const resetData = () => {
    setJour('');
    setMatiere('');
    setNiveau('');
    setParcours('');
    setProf('');
    setSalle('');
    setHeureDebut('');
    setHeureFin('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demandez confirmation avant de soumettre
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous êtes sur le point d'ajouter une nouvelle salle!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32c637',
      cancelButtonColor: '#ec1c24',
      confirmButtonText: 'Oui, ajoutez-la!'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id_prof: prof.id_prof,
          id_matiere: matiere.id_matiere,
          id_salle: salle.id_salle,
          id_parcours: parcours.id_parcours,
          id_niveau: niveau.id_niveau,
          id_jour: jour.id_jour,
          heure_debut: heure_debut,
          heure_fin: heure_fin
        };
        resetData();
        axios
          .post('http://localhost:3000/Organiser/createOrganiser', data)
          .then(() => {
            Swal.fire('Ajouté!', 'La salle a été ajoutée avec succès.', 'success');

            // Ici, vous pouvez également gérer la réinitialisation du formulaire ou la mise à jour de l'état global de l'application si nécessaire
          })
          .catch(() => {
            Swal.fire('Erreur!', 'La création de salle a échoué.', 'error');
          });
      }
    });
  };

  return (
    <>
      <div>
        {/* <h3>Ajouter un nouveau client</h3> */}
        <form onSubmit={handleSubmit}>
          <div>
            <ProfCombo onProfChange={(selectedProf) => setProf({ id_prof: selectedProf })} />
          </div>

          <div className="mb-3">
            <MatiereCombo onMatiereChange={(selectedMatiere) => setMatiere({ id_matiere: selectedMatiere })} />
          </div>
          <div className="mb-3">
            <SalleCombo onSalleChange={(selectedSalle) => setSalle({ id_salle: selectedSalle })} />
          </div>

          <div>
            <ParcoursCombo onParcoursChange={(selectedParcours) => setParcours({ id_parcours: selectedParcours })} />
          </div>

          <div className="mb-3">
            <NiveauCombo onNiveauChange={(selectedNiveau) => setNiveau({ id_niveau: selectedNiveau })} />
          </div>
          <div>
            <JourCombo onJourChange={(selectedJour) => setJour({ id_jour: selectedJour })} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Heure Debut
            </label>
            <input type="time" className="form-control" onChange={(e) => setHeureDebut(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Heure Fin
            </label>
            <input type="time" className="form-control" onChange={(e) => setHeureFin(e.target.value)} />
          </div>

          <button className="btn btn-primary">Valider</button>
        </form>
      </div>
    </>
  );
};

export default FormulaireOrganiser;
