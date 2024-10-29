import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateModifyArtwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [formData, setFormData] = useState({
    id_artista: '',
    nombre: '',
    descripcion: '',
    precio: '',
    estado: '',
    img: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artworksResponse = await axios.get('/protected/artworks');
        const artistsResponse = await axios.get('/protected/artists');
        setArtworks(artworksResponse.data);
        setArtists(artistsResponse.data);
      } catch (error) {
        console.error('Error al cargar las obras y artistas:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const artworkId = e.target.value;
    if (artworkId) {
      const artwork = artworks.find(a => a.id === parseInt(artworkId));
      setSelectedArtwork(artwork);
      setFormData({
        id_artista: artwork.id_artista,
        nombre: artwork.nombre,
        descripcion: artwork.descripcion,
        precio: artwork.precio,
        estado: artwork.estado,
        img: artwork.img
      });
    } else {
      setSelectedArtwork(null);
      setFormData({
        id_artista: '',
        nombre: '',
        descripcion: '',
        precio: '',
        estado: '',
        img: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'descripcion' ? value.slice(0, 500) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedArtwork) {
        await axios.put(`/protected/artworks/${selectedArtwork.id}`, formData);
        alert('Obra actualizada exitosamente');
      } else {
        await axios.post('/protected/artworks', formData);
        alert('Obra creada exitosamente');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error al guardar la obra:', error);
      alert('Error al guardar la obra');
    }
  };

  const handleDelete = async () => {
    if (selectedArtwork) {
      try {
        await axios.delete(`/protected/artworks/${selectedArtwork.id}`);
        alert('Obra eliminada exitosamente');
        navigate('/admin');
      } catch (error) {
        console.error('Error al eliminar la obra:', error);
        alert('Error al eliminar la obra');
      }
    }
  };

  return (
    <div className="form-centered">
      <h2>{selectedArtwork ? 'Modificar Obra' : 'Crear Obra'}</h2>
      <select className="form-select mb-3" onChange={handleSelectChange}>
        <option value="">Seleccionar Obra para Modificar</option>
        {artworks.map(artwork => (
          <option key={artwork.id} value={artwork.id}>{artwork.nombre}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Artista</label>
          <select name="id_artista" className="form-control" value={formData.id_artista} onChange={handleChange} required>
            <option value="">Seleccionar Artista</option>
            {artists.map(artist => (
              <option key={artist.id} value={artist.id}>{artist.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción (máx 500 caracteres)</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength="500"
            required
            style={{ height: '150px' }}
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="number" name="precio" className="form-control" value={formData.precio} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select name="estado" className="form-control" value={formData.estado} onChange={handleChange} required>
            <option value="1">Disponible</option>
            <option value="0">No Disponible</option>
          </select>
        </div>
        <div className="form-group">
          <label>Imagen (URL)</label>
          <input type="text" name="img" className="form-control" value={formData.img} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-2">{selectedArtwork ? 'Actualizar' : 'Crear'}</button>
        {selectedArtwork && (
          <button type="button" className="btn btn-danger mt-2 ml-2" onClick={handleDelete}>Eliminar</button>
        )}
      </form>
    </div>
  );
};

export default CreateModifyArtwork;
