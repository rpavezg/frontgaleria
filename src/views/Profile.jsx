import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setProfile(response.data.user);
    })
    .catch(error => {
      console.error("Error al obtener el perfil:", error);
    });
  }, []);

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
