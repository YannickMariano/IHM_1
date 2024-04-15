import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Matiere() {
  const [matieres, setMatieres] = useState([]);
  const [editingMatiere, setEditingMatiere] = useState({ id: null, designmat: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/matiere/')
      .then(response => {
        setMatieres(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matières:', error);
      });
  };

  const handleEdit = (id, designmat, prof_id) => {
    Swal.fire({
      title: 'Modifier la matière',
      input: 'text',
      inputValue: designmat, prof_id,
      inputPlaceholder: 'Nouvelle designation',
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Tous les champs sont requis';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const {newDesignation, id_prof} = result.value;
        updateMatiere(id, newDesignation, id_prof);
      }
    });
  };

  const updateMatiere = (id, newDesignation, new_id_prof) => {
    axios.put(`http://localhost:5000/matiere/${id}`, { designmat: newDesignation, id_prof: new_id_prof })
      .then(() => {
        const updatedMatieres = matieres.map(matiere => {
          if (matiere.id_matiere === id) {
            return { ...matiere, designmat: newDesignation, id_prof: new_id_prof };
          }
          return matiere;
        });
        setMatieres(updatedMatieres);
        Swal.fire('Modifié!', 'La matière a été modifiée.', 'success');
        setEditingMatiere({ id: null, designmat: '', id_prof: '' });
      })
      .catch(error => {
        console.error('Erreur lors de la modification de la matière:', error);
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
        axios.delete(`http://localhost:5000/matiere/${id}`)
          .then(() => {
            const updatedMatieres = matieres.filter(matiere => matiere.id_matiere !== id);
            setMatieres(updatedMatieres);
            Swal.fire('Supprimé!', 'La matière a été supprimée.', 'success');
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de la matière:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression.', 'error');
          });
      }
    });
  };

  const createNewMatiere = () => {
    Swal.fire({
      title: 'Ajouter un nouveau matiere',
      input: 'text',
      inputPlaceholder: 'Entrez la désignation du nouveau matiere',
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
        const {newDesignation, id_prof} = result.value;

        axios.post('http://localhost:5000/matiere/', { designmat: newDesignation, id_prof: id_prof })
          .then(() => {
            Swal.fire('Succès!', 'Le nouveau matiere a été ajouté.', 'success');
            fetchData();
          })
          .catch(error => {
            console.error('Erreur lors de la création du matiere:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la création du matiere.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2>Liste des Matières</h2>
      <button className="btn btn-primary mb-3" onClick={createNewMatiere}>Ajouter un nouveau matiere</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Professeur</th>
            <th scope="col">Matiere</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map(matiere => (
            <tr key={matiere.id_matiere}>
              <td>{matiere.id_matiere === editingMatiere.id ? (
                <input
                  type="text"
                  name="id_prof"
                  value={editingMatiere.id_prof}
                  onChange={(e) => setEditingMatiere({ ...editingMatiere, id_prof: e.target.value })}
                />
              ) : (
                matiere.id_prof
              )}
              </td>
              <td>{matiere.id_matiere === editingMatiere.id ? (
                <input
                  type="text"
                  name="designmat"
                  value={editingMatiere.designmat}
                  onChange={(e) => setEditingMatiere({ ...editingMatiere, designmat: e.target.value })}
                />
              ) : (
                matiere.designmat
              )}
              </td>
              <td>
                {matiere.id_matiere === editingMatiere.id ? (
                  <div>
                    <button
                      className="btn btn-success btn-lg mr-2"
                      onClick={() => updateMatiere(editingMatiere.id, editingMatiere.designmat)}
                    >
                      Enregistrer
                    </button>
                    <button
                      className="btn btn-secondary btn-lg"
                      onClick={() => setEditingMatiere({ id: null, designmat: '' })}
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary btn-lg mr-2"
                      onClick={() => handleEdit(matiere.id_matiere, matiere.designmat)}
                    >
                      <i className="fas fa-pencil-square blue-icon"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={() => handleDelete(matiere.id_matiere)}
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

export default Matiere;