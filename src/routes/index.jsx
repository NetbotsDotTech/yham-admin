/* eslint-disable prettier/prettier */
import { createBrowserRouter } from 'react-router-dom';
import ComponentsRoutes from './ComponentsRoutes'; // Adjust import path as needed

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(ComponentsRoutes, {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
