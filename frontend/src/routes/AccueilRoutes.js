import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const Accueil = Loadable(lazy(() => import('pages/authentication/Accueil')));
// const EleveRegister = Loadable(lazy(() => import('pages/authentication/EleveRegister')));

// ==============================|| AUTH ROUTING ||============================== //

const AccueilRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/accueil',
      element: <Accueil />
    },
    {
      path: '/',
      element: <Accueil />
    }
  ]
};

export default AccueilRoutes;
