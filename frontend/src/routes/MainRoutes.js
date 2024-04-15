// import { lazy } from 'react';

// // project import
// import Loadable from 'components/Loadable';
// import MainLayout from 'layout/MainLayout';
// // import { element } from 'prop-types';

// // render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// // render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// // render - utilities
// const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
// const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
// const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
// const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// const Professeur = Loadable(lazy(() => import('pages/components-overview/Professeur')));
// const Jour = Loadable(lazy(() => import('pages/components-overview/Jour')));
// const Horaire = Loadable(lazy(() => import('pages/components-overview/Horaire')));
// const Salle = Loadable(lazy(() => import('pages/components-overview/Salle')));
// const Parcours = Loadable(lazy(() => import('pages/components-overview/Parcours')));
// const Matiere = Loadable(lazy(() => import('pages/components-overview/Matiere')));
// const Niveau = Loadable(lazy(() => import('pages/components-overview/Niveau')));
// const EDT = Loadable(lazy(() => import('pages/components-overview/EDT')));

// // ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: <MainLayout />,
//   children: [
//     {
//       path: '/',
//       element: <DashboardDefault />
//     },
//     {
//       path: 'color',
//       element: <Color />
//     },
//     {
//       path: 'dashboard',
//       children: [
//         {
//           path: 'default',
//           element: <DashboardDefault />
//         }
//       ]
//     },
//     {
//       path: 'sample-page',
//       element: <SamplePage />
//     },
//     {
//       path: 'shadow',
//       element: <Shadow />
//     },
//     {
//       path: 'typography',
//       element: <Typography />
//     },
//     {
//       path: 'icons/ant',
//       element: <AntIcons />
//     },
//     {
//       path: 'professeur',
//       element: <Professeur />
//     },
//     {
//       path: 'jour',
//       element: <Jour />
//     },
//     {
//       path: 'horaire',
//       element: <Horaire />
//     },
//     {
//       path: 'salle',
//       element: <Salle />
//     },
//     {
//       path: 'parcour',
//       element: <Parcours />
//     },
//     {
//       path: 'matiere',
//       element: <Matiere />
//     },
//     {
//       path: 'niveau',
//       element: <Niveau />
//     },
//     {
//       path: 'EDT',
//       element: <EDT />
//     }
//   ]
// };

// export default MainRoutes;


import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Professeur = Loadable(lazy(() => import('pages/components-overview/Professeur')));
const Matiere = Loadable(lazy(() => import('pages/components-overview/Matiere')));
const Niveau = Loadable(lazy(() => import('pages/components-overview/Niveau')));
const Salle = Loadable(lazy(() => import('pages/components-overview/Salle')));
const Parcours = Loadable(lazy(() => import('pages/components-overview/Parcours')));
const Horaire = Loadable(lazy(() => import('pages/components-overview/Horaire')));
const Jour = Loadable(lazy(() => import('pages/components-overview/Jour')));
const Calendrier = Loadable(lazy(() => import('pages/components-overview/Calendrier')));
const EDT = Loadable(lazy(() => import('pages/components-overview/EDT')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'matiere',
      element: <Matiere />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'niveau',
      element: <Niveau />
    },
    {
      path: 'Professeur',
      element: <Professeur />
    },
    {
      path: 'salle',
      element: <Salle />
    },
    {
      path: 'horaire',
      element: <Horaire />
    },
    {
      path: 'parcours',
      element: <Parcours />
    },
    {
      path: 'jour',
      element: <Jour />
    },
    {
      path: 'calendrier',
      element: <Calendrier />
    },
    {
      path: 'EDT',
      element: <EDT />
    }
  ]
};



export default MainRoutes;
