import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado (solo visual, no funcional)');
  };

  return (
    <div className="container mt-4">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="tel" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Comentarios</label>
          <textarea name="comentarios" className="form-control" value={formData.comentarios} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
