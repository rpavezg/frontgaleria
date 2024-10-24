import React, { createContext, useState, useEffect } from 'react';
import axios from '../../axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el usuario tiene un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Si hay un token, considera al usuario autenticado
    }
  }, []);

  const login = (email, password) => {
    // Llamada al backend para hacer login
    return axios.post('/api/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);  // Autenticar al usuario
      });
  };

  const logout = () => {
    // Eliminar el token y cambiar el estado de autenticación
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
