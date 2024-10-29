import React, { useEffect, useState, useContext } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/protected/profile');
        setProfile(response.data.user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Cargando información del perfil...</p>;
  }

  return (
    <div className="content-centered">
      <h2>Mi Perfil</h2>
      {profile ? (
        <>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Nombre:</strong> {profile.nombre}</p>
          <p><strong>Apellido:</strong> {profile.apellido}</p>
        </>
      ) : (
        <p>Error al cargar el perfil. Vuelve a intentarlo más tarde.</p>
      )}
    </div>
  );
};

export default Profile;
