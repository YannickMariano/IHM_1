import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HoraireEdit = ({ item, onSubmit }) => {
  const [heure_debut, set_heure_debut] = useState(item.heure_debut);
  const [heure_fin, set_heure_fin] = useState(item.heure_fin);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Utilisez SweetAlert2 pour la confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Confirmez-vous la modification des informations de cette horaire?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32c637',
      cancelButtonColor: '#ec1c24',
      confirmButtonText: 'Oui, modifiez-la!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // L'utilisateur a confirmé la modification
        const updatedItem = { ...item, heure_debut, heure_fin };

        axios
          .put(`http://localhost:5000/horaire/${item.id_horaire}`, updatedItem)
          .then(() => {
            
            Swal.fire('Modifié!', 'Les informations de l\'horaire ont été modifiées avec succès.', 'success');
            onSubmit(updatedItem, true); // Informez le composant parent de la mise à jour
          })
          .catch(() => {
            
            Swal.fire('Erreur!', 'La modification a échoué. Veuillez réessayer.', 'error');
          });
      }
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
            <input type="time" className="form-control" value={heure_debut} onChange={(e) => set_heure_debut(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Heure Fin
            </label>
            <input type="time" className="form-control" value={heure_fin} onChange={(e) => set_heure_fin(e.target.value)} />
          </div>

          <button className="btn btn-primary">Mettre à jour</button>
        </form>
      </div>
    </>
  );
};

export default HoraireEdit;