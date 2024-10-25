import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un token almacenado en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar o verificar el token en el backend para obtener información del usuario
      axios.get('/auth/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Actualiza el estado con los datos del usuario
    localStorage.setItem('token', userData.token); // Almacena el token
  };

  const logout = () => {
    setUser(null); // Elimina al usuario del estado
    localStorage.removeItem('token'); // Elimina el token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
