import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);

      if (response.data.user.level === 1) {
        navigate('/admin');
      } else if (response.data.user.level === 2) {
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required autoComplete="current-password" />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
