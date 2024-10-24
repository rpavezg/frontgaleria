import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('/api/protected/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setProfile(response.data.user);
    })
    .catch(error => {
      console.error("Error al obtener el perfil:", error);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Nombre:</strong> {profile.nombre}</p>
      <p><strong>Apellido:</strong> {profile.apellido}</p>
    </div>
  );
};

export default Profile;
