import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const ProfLogin = Loadable(lazy(() => import('pages/authentication/ProfLogin')));
const ProfRegister = Loadable(lazy(() => import('pages/authentication/ProfRegister')));

// ==============================|| AUTH ROUTING ||============================== //

const ProfRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/prof',
      element: <ProfLogin />
    },
    {
      path: '/',
      element: <ProfLogin />
    },
    {
      path: 'ProfRegister',
      element: <ProfRegister />
    }
  ]
};

export default ProfRoutes;
