// import React, {useState, useEffect} from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import FormulaireCalendrier from 'components/formulaire/Calendrier/calendrier';
// import { Modal } from 'react-bootstrap';
// import interactionPlugin from '@fullcalendar/interaction'; // Importation du plugin pour interactions cliquables

// const MyCalendar = () => {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);
//     // const [eventTitle, setEventTitle] = useState('');
//     const [event, setEvent] = useState([])

//     // useEffect(() => {
//     //     fetch("http://localhost:3000/Calendrier/listCalendrier")
//     //       .then((res) => res.json())
//     //       .then((data) => {
//     //         setEvent(data);
//     //       })
//     //       .catch((error) => {
//     //         console.error('Erreur de chargement des données:', error);
//     //       });
//     //   }, [event]);
//     useEffect(() => {
//         fetch("http://localhost:3000/Calendrier/listCalendrier")
//           .then((res) => res.json())
//           .then((data) => {
//             // Convertir les données pour FullCalendar si nécessaire...
//             const events = data.map((item) => {
//               return {
//                 title: item.design_calendrier,
//                 start: item.date, // Assurez-vous que cette propriété existe ou ajustez selon vos données
//                 // Plus de propriétés ici selon vos besoins...
//               };
//             });
//             setEvent(events);
//           })
//           .catch((error) => {
//             console.error('Erreur de chargement des données:', error);
//           });
//     }, []);

//     const handleDateClick = (arg) => {
//       setSelectedDate(arg.dateStr); // Stocke la date cliquée
//       setModalOpen(true); // Ouvre le modal
//     };
  
//     // const handleAddEvent = (formData, isUpdate = false) => {

//     //   // Ajouter l'événement au calendrier ou à votre base de données ici
//     // //   console.log("Event Title: ", eventTitle);
//     //   console.log("Date: ", selectedDate);
//     //   setModalOpen(false); // Ferme le modal
//     // //   setEventTitle(''); // Réinitialiser le titre de l'événement
      
//     //   if (isUpdate) {
//     //     const updatedData = event.map((item) => (item.id_calendrier === formData.id_calendrier ? formData : item));
//     //     setEvent(updatedData);
//     //   } else {
//     //     setEvent([...event, formData]);
//     //   }
//     //   setModalOpen(false);
//     // };

//     const handleAddEvent = (formData) => {
//         const newEvent = {
//           title: formData.design_calendrier,
//           start: selectedDate,
//           // Ajoutez ici toutes les autres propriétés nécessaires pour votre événement...
//         };
      
//         // Ajoutez le nouvel événement à l'état
//         setEvent((prevEvents) => [...prevEvents, newEvent]);
//         setModalOpen(false);
//       };

//   return (
//    <>
//     <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Ajout de nouvelle horaire</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <FormulaireCalendrier selectedDate={selectedDate} onSubmit={handleAddEvent}/>
//         </Modal.Body>
//       </Modal>

//     <div className="pd-20 card-box mb-30">
//       <div className="calendar-wrap">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           dateClick={handleDateClick}
//           events={event}
//           // autres options et événements ici...
//         />
//       </div>
//       {/*<Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="eventTitle"
//             label="Event Title"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={eventTitle}
//             onChange={(e) => setEventTitle(e.target.value)}
//           />
//           {/* Ajouter d'autres champs si nécessaire 
//         </DialogContent> 
//         <DialogActions>
//           <Button onClick={() => setModalOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEvent} color="primary">
//             Add Event
//           </Button>
//         </DialogActions>
//       </Dialog>*/}
//     </div>
//    </>
//   );
// };

// export default MyCalendar;

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Organiser from 'components/organiser/listeOrganiser';
// import { Modal, Button } from 'react-bootstrap';
// import MainCard from 'components/MainCard';
// import { Grid } from '@mui/material';
// import FormulaireOrganiser from 'components/organiser/formulaireOrganiser';
// import MatiereCombo from 'components/combobox/matiereCombo';
// import JourCombo from 'components/combobox/jourCombo';
// import NiveauCombo from 'components/combobox/niveauCombo';
// import ParcoursCombo from 'components/combobox/parcoursCombo';
// import ProfCombo from 'components/combobox/profCombo';
// import SalleCombo from 'components/combobox/salleCombo';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MatiereCombo from './MatiereCombo';
// import JourCombo from './JourCombo';
// import NiveauCombo from './NiveauCombo';
// import ParcourCombo from './ParcourCombo';
// import ProfCombo from './ProfCombo';
// import SalleCombo from './SalleCombo';



const EDT = () => {
  const timeSlots = [
    '7:30 AM',  '9:00 AM',  '10:30 AM',
    '12:00 PM', '1:00 PM', '1:30 PM',
    '3:00 PM',  '4:30 PM', '6:00 PM'
  ];
  
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredri', 'Samedi'];

  // const [donnees, setDonnees] = useState([]);
  // const [showAdd, setShowAdd] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:3000/Organiser/listOrganiser')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDonnees(data);
  //     })
  //     .catch((error) => {
  //       console.error('Erreur de chargement des données:', error);
  //     });
  // }, []);

  // const handleFormSubmit = (formData, isUpdate = false) => {
  //   if (isUpdate) {
  //     const updatedData = donnees.map((item) => (item.id_organiser === formData.id_organiser ? formData : item));
  //     setDonnees(updatedData);
  //   } else {
  //     setDonnees([...donnees, formData]);
  //   }
  // }

  return(
    <>
     <Organiser/>
{/* 
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
      </Modal> */}

  <TableContainer component={Paper}>
    <Table className="table-bordered">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {days.map((day, index) => (
            <TableCell key={index} className="border-cell">{day}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {timeSlots.map((timeSlot, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row" className="border-cell">
              {timeSlot}
            </TableCell>
            {days.map((day, index) => (
                <TableCell key={index} className="border-cell"></TableCell>
   
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </>
  )
 

}


export default EDT;

// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { Modal, Button } from 'react-bootstrap';
// import MainCard from 'components/MainCard';
// import { Grid } from '@mui/material';
// import FormulaireOrganiser from 'components/organiser/formulaireOrganiser';

// const EDT = () => {
//   const timeSlots = [
//         '7:30 AM',  '9:00 AM',  '10:30 AM',
//         '12:00 PM', '1:00 PM', '1:30 PM',
//         '3:00 PM',  '4:30 PM', '6:00 PM'
//       ];
      
//       const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
//       const [donnees, setDonnees] = useState([]);
//       const [showAdd, setShowAdd] = useState(false);
  
//   // Fonction pour convertir l'heure au format 24h pour faciliter la comparaison
//   const convertTime12to24 = (time12h) => {
//     const [time, modifier] = time12h.split(' ');
//     let [hours, minutes] = time.split(':');
//     if (hours === '12') {
//       hours = '00';
//     }
//     if (modifier === 'PM') {
//       hours = parseInt(hours, 10) + 12;
//     }
//     return `${hours}:${minutes}`;
//   };

//   // Fonction pour vérifier si un cours donné doit être affiché dans le créneau horaire courant
//   const isCoursInCreneau = (cours, timeSlot) => {
//     const debut24h = convertTime12to24(cours.heure_debut);
//     const fin24h = convertTime12to24(cours.heure_fin);
//     const creneau24h = convertTime12to24(timeSlot);
    
//     return debut24h <= creneau24h && fin24h >= creneau24h;
//   };

//   //... useEffect et handleFormSubmit inchangés
   

//   useEffect(() => {
//     fetch('http://localhost:3000/Organiser/listOrganiser')
//       .then((res) => res.json())
//       .then((data) => {
//         setDonnees(data);
//       })
//       .catch((error) => {
//         console.error('Erreur de chargement des données:', error);
//       });
//   }, []);

//   const handleFormSubmit = (formData, isUpdate = false) => {
//     if (isUpdate) {
//       const updatedData = donnees.map((item) => (item.id_organiser === formData.id_organiser ? formData : item));
//       setDonnees(updatedData);
//     } else {
//       setDonnees([...donnees, formData]);
//     }
//   }

//   return (
//     <>
//       {/* ... Modal et Button inchangés */}
//       <MainCard style={{ marginBottom: '20px' }}>
//          <Grid container spacing={6}>
//            <Grid item xs={6} sm={6} md={6} lg={6}>
//              <div style={{ display: 'flex', flexDirection: 'column' }}>
//                <div>
//                  <h1>LISTE DES ORGANISER</h1>
//                </div>

//                <div>
//                  <Button
//                   variant="primary"
//                   onClick={() => setShowAdd(true)}
//                   style={{
//                     marginBottom: '30px',
//                     padding: '10px 20px', // Augmente le padding pour un bouton plus grand
//                     fontSize: '1.25rem' // Augmente la taille du texte
//                   }}
//                 >
//                   ADD
//                 </Button>
//               </div>
//             </div>
//           </Grid>
//         </Grid>
//       </MainCard>

//       <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Ajout de nouvelle salle</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <FormulaireOrganiser onSubmit={handleFormSubmit}/>
//         </Modal.Body>
//       </Modal>
//       <TableContainer component={Paper}>
//         <Table className="table-bordered">
//         <TableHead>
//          <TableRow>
//            <TableCell></TableCell>
//            {days.map((day, index) => (
//             <TableCell key={index} className="border-cell">{day}</TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//           <TableBody>
//             {timeSlots.map((timeSlot, indexTimeSlot) => (
//               <TableRow key={indexTimeSlot}>
//                 <TableCell component="th" scope="row" className="border-cell">
//                   {timeSlot}
//                 </TableCell>
//                 {days.map((day, indexDay) => {
//                   // Trouvez les cours qui correspondent au jour et au créneau horaire
//                   const coursDuJourEtCreneau = donnees.filter(cours =>
//                     cours.jour === day && isCoursInCreneau(cours, timeSlot)
//                   );
                  
//                   // Renvoyer une cellule pour chaque jour de la semaine
//                   return (
//                     <TableCell key={indexDay} className="border-cell">
//                       {/* Afficher les cours trouvés ou rien si aucun cours ne correspond */}
//                       {coursDuJourEtCreneau.map(cours => (
//                         <div key={cours.id}>{`Prof: ${cours.id_prof}, Matière: ${cours.id_matiere}`}</div>
//                       ))}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default EDT;