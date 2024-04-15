import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormulaireJour = () => {
  const [designation, setDesignation] = useState('');

  const resetData = () => {
    setDesignation('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demandez confirmation avant de soumettre
    
    const data = {
      design_jour: designation,
    };
    resetData();
    axios
      .post(`http://localhost:5000/jour/create/`, data)
      .then(() => {
        Swal.fire('Ajouté!', 'Jour ajouté avec succès.', 'success');

        // Ici, vous pouvez également gérer la réinitialisation du formulaire ou la mise à jour de l'état global de l'application si nécessaire
      })
      .catch(() => {
        Swal.fire('Erreur!', 'Création de jour échoué.', 'error');
      });
  };

  return (
    <>
      <div>
        {/* <h3>Ajouter un nouveau client</h3> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Jour
            </label>
            <input type="text" className="form-control" onChange={(e) => setDesignation(e.target.value)} />
          </div>

          <button className="btn btn-primary">Valider</button>
        </form>
      </div>
    </>
  );
};

export default FormulaireJour;