import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Admin = () => {
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistForm, setArtistForm] = useState({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworkForm, setArtworkForm] = useState({ nombre: '', descripcion: '', precio: '', estado: '', img: '', id_artista: '' });

  useEffect(() => {
    fetchArtists();
    fetchArtworks();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get('/api/artists');
      setArtists(response.data);
    } catch (error) {
      console.error('Error al obtener los artistas:', error);
    }
  };

  const fetchArtworks = async () => {
    try {
      const response = await axios.get('/api/artworks');
      setArtworks(response.data);
    } catch (error) {
      console.error('Error al obtener las obras:', error);
    }
  };

  const handleArtistChange = (e) => {
    setArtistForm({ ...artistForm, [e.target.name]: e.target.value });
  };

  const handleArtworkChange = (e) => {
    setArtworkForm({ ...artworkForm, [e.target.name]: e.target.value });
  };

  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    setArtistForm(artist);
  };

  const handleArtworkSelect = (artwork) => {
    setSelectedArtwork(artwork);
    setArtworkForm(artwork);
  };

  const handleArtistSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedArtist) {
        // Actualizar artista existente
        await axios.put(`/api/artists/${selectedArtist.id}`, artistForm);
        alert('Artista actualizado exitosamente');
      } else {
        // Crear nuevo artista
        await axios.post('/api/artists', artistForm);
        alert('Artista creado exitosamente');
      }
      setArtistForm({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
      setSelectedArtist(null);
      fetchArtists();
    } catch (error) {
      console.error('Error al guardar el artista:', error);
    }
  };

  const handleArtworkSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedArtwork) {
        // Actualizar obra existente
        await axios.put(`/api/artworks/${selectedArtwork.id}`, artworkForm);
        alert('Obra actualizada exitosamente');
      } else {
        // Crear nueva obra
        await axios.post('/api/artworks', artworkForm);
        alert('Obra creada exitosamente');
      }
      setArtworkForm({ nombre: '', descripcion: '', precio: '', estado: '', img: '', id_artista: '' });
      setSelectedArtwork(null);
      fetchArtworks();
    } catch (error) {
      console.error('Error al guardar la obra:', error);
    }
  };

  const handleArtistDelete = async () => {
    if (selectedArtist) {
      try {
        await axios.delete(`/api/artists/${selectedArtist.id}`);
        alert('Artista eliminado exitosamente');
        setArtistForm({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
        setSelectedArtist(null);
        fetchArtists();
      } catch (error) {
        console.error('Error al eliminar el artista:', error);
      }
    }
  };

  const handleArtworkDelete = async () => {
    if (selectedArtwork) {
      try {
        await axios.delete(`/api/artworks/${selectedArtwork.id}`);
        alert('Obra eliminada exitosamente');
        setArtworkForm({ nombre: '', descripcion: '', precio: '', estado: '', img: '', id_artista: '' });
        setSelectedArtwork(null);
        fetchArtworks();
      } catch (error) {
        console.error('Error al eliminar la obra:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Panel de Administración</h2>
      <div className="mt-5">
        <h4>Crear o Modificar Artista</h4>
        <select onChange={(e) => handleArtistSelect(JSON.parse(e.target.value))} className="form-control mb-3">
          <option value="">Seleccione un artista para editar</option>
          {artists.map((artist) => (
            <option key={artist.id} value={JSON.stringify(artist)}>
              {artist.nombre}
            </option>
          ))}
        </select>
        <form onSubmit={handleArtistSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={artistForm.nombre} onChange={handleArtistChange} className="form-control mb-2" required />
          <input type="text" name="biografia" placeholder="Biografía" value={artistForm.biografia} onChange={handleArtistChange} className="form-control mb-2" required />
          <input type="text" name="nacionalidad" placeholder="Nacionalidad" value={artistForm.nacionalidad} onChange={handleArtistChange} className="form-control mb-2" required />
          <input type="date" name="nacimiento" placeholder="Fecha de Nacimiento" value={artistForm.nacimiento} onChange={handleArtistChange} className="form-control mb-2" required />
          <input type="text" name="img" placeholder="URL de Imagen" value={artistForm.img} onChange={handleArtistChange} className="form-control mb-2" required />
          <button type="submit" className="btn btn-primary me-2">Guardar Artista</button>
          <button type="button" className="btn btn-danger" onClick={handleArtistDelete}>Eliminar Artista</button>
        </form>
      </div>

      <div className="mt-5">
        <h4>Crear o Modificar Obra</h4>
        <select onChange={(e) => handleArtworkSelect(JSON.parse(e.target.value))} className="form-control mb-3">
          <option value="">Seleccione una obra para editar</option>
          {artworks.map((artwork) => (
            <option key={artwork.id} value={JSON.stringify(artwork)}>
              {artwork.nombre}
            </option>
          ))}
        </select>
        <form onSubmit={handleArtworkSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={artworkForm.nombre} onChange={handleArtworkChange} className="form-control mb-2" required />
          <input type="text" name="descripcion" placeholder="Descripción" value={artworkForm.descripcion} onChange={handleArtworkChange} className="form-control mb-2" required />
          <input type="number" name="precio" placeholder="Precio" value={artworkForm.precio} onChange={handleArtworkChange} className="form-control mb-2" required />
          <select name="estado" value={artworkForm.estado} onChange={handleArtworkChange} className="form-control mb-2" required>
            <option value="">Estado</option>
            <option value="1">Disponible</option>
            <option value="0">No disponible</option>
          </select>
          <input type="text" name="img" placeholder="URL de Imagen" value={artworkForm.img} onChange={handleArtworkChange} className="form-control mb-2" required />
          <select name="id_artista" value={artworkForm.id_artista} onChange={handleArtworkChange} className="form-control mb-2" required>
            <option value="">Seleccione un artista</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.nombre}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary me-2">Guardar Obra</button>
          <button type="button" className="btn btn-danger" onClick={handleArtworkDelete}>Eliminar Obra</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
