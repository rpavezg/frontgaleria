import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirige a la página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, permite el acceso a la ruta
  return children;
};

export default PrivateRoute;
