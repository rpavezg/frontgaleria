import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    // Aquí puedes obtener información adicional del usuario admin
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Panel de Administración</h2>
      <p>Bienvenido, administrador. Aquí puedes gestionar los artistas y las obras.</p>
      {/* Añade botones para las diferentes acciones administrativas */}
    </div>
  );
};

export default Admin;
