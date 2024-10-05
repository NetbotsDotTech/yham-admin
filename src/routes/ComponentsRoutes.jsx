/* eslint-disable prettier/prettier */
import { lazy } from 'react';
import MainLayout from 'layout/Dashboard/index';
import Loadable from 'components/Loadable';
import RootRoute from './RootRoute'; 

// render - data display components
const Dashboard = Loadable(lazy(() => import('pages/dashboard/default')));
const Artifacts = Loadable(lazy(() => import('pages/artifacts/TableIndex.jsx')));
const StocksView = Loadable(lazy(() => import('pages/stocks/table')));
const Users = Loadable(lazy(() => import('pages/users/AddUser')));
const Settings = Loadable(lazy(() => import('pages/setting/Setting')));
const QrCodes = Loadable(lazy(() => import('pages/qr-codes/QrCodes')));
const TimeTables = Loadable(lazy(() => import('pages/timetable/TimeTables')));
const Login = Loadable(lazy(() => import('pages/auth/login')));
const EnterEmail = Loadable(lazy(() => import('pages/auth/enterEmail')));
const VerifyOtp = Loadable(lazy(() => import('pages/auth/otpConfirmation')));
const UpdatePassword = Loadable(lazy(() => import('pages/auth/updatePassword')));

// ==============================|| COMPONENTS ROUTES ||============================== //

const ComponentsRoutes = [
  {
    path: '/',
    element: <RootRoute><MainLayout /></RootRoute>, // Protect all routes under MainLayout
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'artifacts', element: <Artifacts /> },
      { path: 'stock-registering', element: <StocksView /> },
      { path: 'users', element: <Users /> },
      { path: 'qr-codes', element: <QrCodes /> },
      { path: 'time-tables', element: <TimeTables /> },
      { path: 'settings', element: <Settings /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <EnterEmail />
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />
  },
  {
    path: '/update-password',
    element: <UpdatePassword />
  }
];

export default ComponentsRoutes;
