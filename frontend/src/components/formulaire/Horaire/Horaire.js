import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormulaireHoraire = () => {
    const [heure_debut, set_heure_debut] = useState('');
    const [heure_fin, set_heure_fin] = useState('');

  const resetData = () => {
    set_heure_debut('');
    set_heure_fin('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demandez confirmation avant de soumettre
    
    const data = {
      heure_debut: heure_debut,
      heure_fin: heure_fin,
    };
    resetData();
    axios
      .post(`http://localhost:5000/horaire/`, data)
      .then(() => {
        Swal.fire('Ajouté!', 'Horaire ajouté avec succès.', 'success');

        // Ici, vous pouvez également gérer la réinitialisation du formulaire ou la mise à jour de l'état global de l'application si nécessaire
      })
      .catch(() => {
        Swal.fire('Erreur!', 'Création d\' horaire échoué.', 'error');
      });
     
    };

  return (
    <>
      <div>
        {/* <h3>Ajouter un nouveau client</h3> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Heure Debut
            </label>
            <input type="time" className="form-control" onChange={(e) => set_heure_debut(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Heure Fin
            </label>
            <input type="time" className="form-control" onChange={(e) => set_heure_fin(e.target.value)} />
          </div>

          <button className="btn btn-primary">Valider</button>
        </form>
      </div>
    </>
  );
};

export default FormulaireHoraire;