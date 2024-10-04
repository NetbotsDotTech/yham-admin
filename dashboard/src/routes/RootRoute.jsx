/* eslint-disable prettier/prettier */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../sections/auth/IsAuthenticated';

const RootRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default RootRoute;
