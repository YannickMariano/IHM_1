import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Parcour() {
  const [parcours, setParcours] = useState([]);
  const [editingParcour, setEditingParcour] = useState({ id: null, design_parcour: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/parcour/')
      .then(response => {
        setParcours(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des parcour:', error);
      });
  };

  const handleEdit = (id, design_parcour) => {
    Swal.fire({
      title: 'Modifier la parcour',
      input: 'text',
      inputValue: design_parcour,
      inputPlaceholder: 'Nouvelle designation',
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Le champ de la designation est requis';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newDesignation = result.value;
        updateParcour(id, newDesignation);
      }
    });
  };

  const updateParcour = (id, newDesignation) => {
    axios.put(`http://localhost:5000/parcour/${id}`, { design_parcour: newDesignation })
      .then(() => {
        const updatedParcours = parcours.map(parcour => {
          if (parcour.id_parcour === id) {
            return { ...parcour, design_parcour: newDesignation };
          }
          return parcour;
        });
        setParcours(updatedParcours);
        Swal.fire('Modifié!', 'La parcour a été modifiée.', 'success');
        setEditingParcour({ id: null, design_parcour: '' });
      })
      .catch(error => {
        console.error('Erreur lors de la modification de la parcour:', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la modification.', 'error');
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/parcour/${id}`)
          .then(() => {
            const updatedParcours = parcours.filter(parcour => parcour.id_parcour !== id);
            setParcours(updatedParcours);
            Swal.fire('Supprimé!', 'La parcour a été supprimée.', 'success');
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de la parcour:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression.', 'error');
          });
      }
    });
  };

  const createNewParcour = () => {
    Swal.fire({
      title: 'Ajouter un nouveau parcour',
      input: 'text',
      inputPlaceholder: 'Entrez la désignation du nouveau parcour',
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Le champ de la désignation est requis';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newDesignation = result.value;
        axios.post('http://localhost:5000/parcour/', { design_parcour: newDesignation })
          .then(() => {
            Swal.fire('Succès!', 'Le nouveau parcour a été ajouté.', 'success');
            fetchData();
          })
          .catch(error => {
            console.error('Erreur lors de la création du parcour:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la création du parcour.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2>Liste des parcours</h2>
      <button className="btn btn-primary mb-3" onClick={createNewParcour}>Ajouter un nouveau parcour</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Designation</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcours.map(parcour => (
            <tr key={parcour.id_parcour}>
              <td>{parcour.id_parcour === editingParcour.id ? (
                <input
                  type="text"
                  name="design_parcour"
                  value={editingParcour.design_parcour}
                  onChange={(e) => setEditingParcour({ ...editingParcour, design_parcour: e.target.value })}
                />
              ) : (
                parcour.design_parcour
              )}</td>
              <td>
                {parcour.id_parcour === editingParcour.id ? (
                  <div>
                    <button
                      className="btn btn-success btn-lg mr-2"
                      onClick={() => updateParcour(editingParcour.id, editingParcour.design_parcour)}
                    >
                      Enregistrer
                    </button>
                    <button
                      className="btn btn-secondary btn-lg"
                      onClick={() => setEditingParcour({ id: null, design_parcour: '' })}
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary btn-lg mr-2"
                      onClick={() => handleEdit(parcour.id_parcour, parcour.design_parcour)}
                    >
                      <i className="fas fa-pencil-square blue-icon"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={() => handleDelete(parcour.id_parcour)}
                    >
                      <i className="fas fa-trash red-icon"></i>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parcour;