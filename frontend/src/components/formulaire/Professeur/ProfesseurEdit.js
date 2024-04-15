import React, {useState} from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const ProfesseurEdit = ({item, onSubmit}) =>{
    const [nom, setNom] = useState(item.nom)
    const [email, setemail] = useState(item.email)
    const [mdp, setmdp] = useState(item.mdp)

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Utilisez SweetAlert2 pour la confirmation
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Confirmez-vous la modification des informations de ce professeur?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32c637',
            cancelButtonColor: '#ec1c24',
            confirmButtonText: 'Oui, modifiez-le!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                // L'utilisateur a confirmé la modification
                const updatedItem = { ...item, nom, email, mdp };
    
                axios.patch(`http://localhost:5000/prof/${item.idProf}`, updatedItem)
                    .then(() => {
                       
                        Swal.fire(
                            'Modifié!',
                            'Les informations du professeur ont été modifiées avec succès.',
                            'success'
                        );
                        onSubmit(updatedItem, true); // Informez le composant parent de la mise à jour
                    })
                    .catch(() => {
                        console.log('tsy mety:' , item)
                        Swal.fire(
                            'Erreur!',
                            'La modification a échoué. Veuillez réessayer.',
                            'error'
                        );
                    });
            }
        });
    };

    return(
        <>
        <div>
            {/* <h3>Ajouter un nouveau client</h3> */}
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Nom 
                </label>
                <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    email
                </label>
                <input type="email" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    mdp
                </label>
                <input type="password" className="form-control" value={mdp} onChange={(e) => setmdp(e.target.value)} />
            </div>

            <button className="btn btn-primary">Mettre à jour</button>
            
            </form>
        </div>
    </>
    )
}

export default ProfesseurEdit