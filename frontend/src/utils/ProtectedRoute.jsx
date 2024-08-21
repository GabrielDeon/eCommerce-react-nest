import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token');

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
