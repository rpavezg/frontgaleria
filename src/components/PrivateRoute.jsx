import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, levelRequired }) => {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado o su nivel no es el requerido, redirige
  if (!user || user.level !== levelRequired) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
