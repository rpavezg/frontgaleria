import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateModifyArtist = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    biografia: '',
    nacionalidad: '',
    nacimiento: '',
    img: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error al cargar los artistas:', error);
      }
    };

    fetchArtists();
  }, []);

  const handleSelectChange = (e) => {
    const artistId = e.target.value;
    if (artistId) {
      const artist = artists.find(a => a.id === parseInt(artistId));
      setSelectedArtist(artist);
      setFormData({ 
        nombre: artist.nombre,
        biografia: artist.biografia,
        nacionalidad: artist.nacionalidad,
        nacimiento: artist.nacimiento,
        img: artist.img
      });
    } else {
      setSelectedArtist(null);
      setFormData({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.slice(0, 500) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedArtist) {
        await axios.put(`/artists/${selectedArtist.id}`, formData);
        alert('Artista actualizado exitosamente');
      } else {
        await axios.post('/artists', formData);
        alert('Artista creado exitosamente');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error al guardar el artista:', error);
      alert('Error al guardar el artista');
    }
  };

  const handleDelete = async () => {
    if (selectedArtist) {
      try {
        await axios.delete(`/artists/${selectedArtist.id}`);
        alert('Artista eliminado exitosamente');
        navigate('/admin');
      } catch (error) {
        console.error('Error al eliminar el artista:', error);
        alert('Error al eliminar el artista');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>{selectedArtist ? 'Modificar Artista' : 'Crear Artista'}</h2>
      <select className="form-select mb-3" onChange={handleSelectChange}>
        <option value="">Seleccionar Artista para Modificar</option>
        {artists.map(artist => (
          <option key={artist.id} value={artist.id}>{artist.nombre}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Biografía (máx 500 caracteres)</label>
          <textarea name="biografia" className="form-control" value={formData.biografia} onChange={handleChange} maxLength="500" required style={{ height: '150px' }} />
        </div>
        {/* Resto del formulario */}
      </form>
    </div>
  );
};

export default CreateModifyArtist;
