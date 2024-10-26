import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, levelRequired }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.level !== levelRequired) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
