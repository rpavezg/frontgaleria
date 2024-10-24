import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, redirige al login
      navigate('/login');
      return;
    }

    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setProfile(response.data.user);
    })
    .catch(error => {
      console.error("Error al obtener el perfil:", error);
      if (error.response && error.response.status === 401) {
        // Si el token no es válido o expiró, redirige al login
        localStorage.removeItem('token');
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Nombre:</strong> {profile.nombre}</p>
      <p><strong>Apellido:</strong> {profile.apellido}</p>
      {/* Aquí puedes agregar la opción para modificar el perfil */}
    </div>
  );
};

export default Profile;
