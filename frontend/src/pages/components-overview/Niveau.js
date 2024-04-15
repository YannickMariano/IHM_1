import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Niveau() {
  const [niveaus, setniveaus] = useState([]);
  const [editingniveau, setEditingniveau] = useState({ id: null, design_niveau: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/niveau/')
      .then(response => {
        setniveaus(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des niveau:', error);
      });
  };

  const handleEdit = (id_niveau, design_niveau) => {
    Swal.fire({
      title: 'Modifier le niveau',
      input: 'text',
      inputValue: design_niveau,
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
        updateniveau(id_niveau, newDesignation);
      }
    });
  };

  const updateniveau = (id_niveau, newDesignation) => {
    axios.put(`http://localhost:5000/niveau/${id_niveau}`, { design_niveau: newDesignation })
      .then(() => {
        const updatedniveaus = niveaus.map(niveau => {
          if (niveau.id_niveau === id_niveau) {
            return { ...niveau, design_niveau: newDesignation };
          }
          return niveau;
        });
        setniveaus(updatedniveaus);
        Swal.fire('Modifié!', 'Le niveau a été modifié.', 'success');
        setEditingniveau({ id: null, design_niveau: '' });
      })
      .catch(error => {
        console.error('Erreur lors de la modification du niveau:', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la modification.', 'error');
      });
  };

  const handleDelete = (id_niveau) => {
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
        axios.delete(`http://localhost:5000/niveau/${id_niveau}`)
          .then(() => {
            const updatedniveaus = niveaus.filter(niveau => niveau.id_niveau !== id_niveau);
            setniveaus(updatedniveaus);
            Swal.fire('Supprimé!', 'Le niveau a été supprimé.', 'success');
          })
          .catch(error => {
            console.error('Erreur lors de la suppression du niveau:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression.', 'error');
          });
      }
    });
  };

  const createNewNiveau = () => {
    Swal.fire({
      title: 'Ajouter un nouveau niveau',
      input: 'text',
      inputPlaceholder: 'Entrez la désignation du nouveau niveau',
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
        axios.post('http://localhost:5000/niveau/', { design_niveau: newDesignation })
          .then(() => {
            // Handle success
            Swal.fire('Succès!', 'Le nouveau niveau a été ajouté.', 'success');
            fetchData();
          })
          .catch(error => {
            // Handle error
            console.error('Erreur lors de la création du niveau:', error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la création du niveau.', 'error');
          });
      }
    });
  };
  

  return (
    <div>
      <h2>Liste des Niveaux</h2>
      <button className="btn btn-primary mb-2" onClick={createNewNiveau}>
        Ajouter un nouveau Niveau
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Designation</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {niveaus.map(niveau => (
            <tr key={niveau.id_niveau}>
              <td>{niveau.id_niveau === editingniveau.id ? (
                <input
                  type="text"
                  name="design_niveau"
                  value={editingniveau.design_niveau}
                  onChange={(e) => setEditingniveau({ ...editingniveau, design_niveau: e.target.value })}
                />
              ) : (
                niveau.design_niveau
              )}</td>
              <td>
                {niveau.id_niveau === editingniveau.id ? (
                  <div>
                    <button
                      className="btn btn-success btn-lg mr-2"
                      onClick={() => updateniveau(editingniveau.id, editingniveau.design_niveau)}
                    >
                      Enregistrer
                    </button>
                    <button
                      className="btn btn-secondary btn-lg"
                      onClick={() => setEditingniveau({ id: null, design_niveau: '' })}
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-primary btn-lg mr-2"
                      onClick={() => handleEdit(niveau.id_niveau, niveau.design_niveau)}
                    >
                      <i className="fas fa-pencil-square blue-icon"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={() => handleDelete(niveau.id_niveau)}
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

export default Niveau;