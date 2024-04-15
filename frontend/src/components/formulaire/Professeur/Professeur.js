import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const FormulaireProfesseur = () => {
    const [nom, setNom] = useState('')
    const [email, setemail] = useState('')
    const [mdp, setmdp] = useState('')

    const resetData = () =>{
        setNom('');
        setemail('');
        setmdp('');
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Demandez confirmation avant de soumettre
       
        const data = {
            nom: nom,
            email: email,
            mdp: mdp,
        };
    
        resetData();
        axios
        .post('http://localhost:5000/prof', data)
        .then(() => {
            Swal.fire(
                'Ajouté!',
                'Le client a été ajouté avec succès.',
                'success',
            );
            
            // Ici, vous pouvez également gérer la réinitialisation du formulaire ou la mise à jour de l'état global de l'application si nécessaire
        })
        .catch(() => {
            Swal.fire(
                'Erreur!',
                'La création du client a échoué.',
                'error'
            );
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
                    <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        email
                    </label>
                    <input type="email" className="form-control" onChange={(e) => setemail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Mot de passe 
                    </label>
                    <input type="password" className="form-control" onChange={(e) => setmdp(e.target.value)} />
                </div>
                    
                <button className="btn btn-primary">Valider</button>
                
                </form>
            </div>
        </>
    )
    
}

export default FormulaireProfesseur