import React, { useEffect, useState, useContext } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null); // Cambiamos a `null` para validar el perfil cargado
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/protected/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    // Si el usuario está autenticado, obtenemos su perfil
    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      {profile ? (
        <>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Nombre:</strong> {profile.nombre}</p>
          <p><strong>Apellido:</strong> {profile.apellido}</p>
        </>
      ) : (
        <p>Cargando información del perfil...</p>
      )}
    </div>
  );
};

export default Profile;
