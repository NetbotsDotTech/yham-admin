/* eslint-disable prettier/prettier */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../sections/auth/IsAuthenticated'; 

const RootRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default RootRoute;
