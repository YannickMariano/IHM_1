import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const EleveLogin = Loadable(lazy(() => import('pages/authentication/EleveLogin')));
const EleveRegister = Loadable(lazy(() => import('pages/authentication/EleveRegister')));

// ==============================|| AUTH ROUTING ||============================== //

const EleveRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/eleve',
      element: <EleveLogin />
    },
    {
      path: '/',
      element: <EleveLogin />
    },
    {
      path: 'EleveRegister',
      element: <EleveRegister />
    }
  ]
};

export default EleveRoutes;
