import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
      const loginResponse = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', loginResponse.data.token);
      if (loginResponse.data.user.level === 1) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="main-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required autoComplete="new-password" />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
