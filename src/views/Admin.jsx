import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Admin = () => {
  const [obrasOfertadas, setObrasOfertadas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistFormData, setArtistFormData] = useState({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
  const [obras, setObras] = useState([]);
  const [selectedObra, setSelectedObra] = useState(null);
  const [obraFormData, setObraFormData] = useState({ id_artista: '', nombre: '', descripcion: '', precio: '', estado: '', img: '' });

  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        const obrasOfertadasResponse = await axios.get('/api/admin/obras-ofertadas');
        setObrasOfertadas(obrasOfertadasResponse.data);

        const usuariosResponse = await axios.get('/api/admin/usuarios');
        setUsuarios(usuariosResponse.data);

        const artistasResponse = await axios.get('/api/artists');
        setArtistas(artistasResponse.data);

        const obrasDataResponse = await axios.get('/api/admin/obras');
        setObras(obrasDataResponse.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleArtistChange = (e) => {
    setSelectedArtist(artistas.find(artist => artist.id === Number(e.target.value)));
  };

  const handleObraChange = (e) => {
    setSelectedObra(obras.find(obra => obra.id === Number(e.target.value)));
  };

  const handleArtistFormChange = (e) => {
    setArtistFormData({ ...artistFormData, [e.target.name]: e.target.value });
  };

  const handleObraFormChange = (e) => {
    setObraFormData({ ...obraFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateArtist = async () => {
    try {
      await axios.put(`/api/admin/modify-artist/${selectedArtist.id}`, artistFormData);
      alert('Artista actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar artista:', error);
    }
  };

  const handleDeleteArtist = async () => {
    try {
      await axios.delete(`/api/admin/delete-artist/${selectedArtist.id}`);
      alert('Artista eliminado exitosamente');
      setSelectedArtist(null);
      setArtistFormData({ nombre: '', biografia: '', nacionalidad: '', nacimiento: '', img: '' });
    } catch (error) {
      console.error('Error al eliminar artista:', error);
    }
  };

  const handleUpdateObra = async () => {
    try {
      await axios.put(`/api/admin/modify-obra/${selectedObra.id}`, obraFormData);
      alert('Obra actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar obra:', error);
    }
  };

  const handleDeleteObra = async () => {
    try {
      await axios.delete(`/api/admin/delete-obra/${selectedObra.id}`);
      alert('Obra eliminada exitosamente');
      setSelectedObra(null);
      setObraFormData({ id_artista: '', nombre: '', descripcion: '', precio: '', estado: '', img: '' });
    } catch (error) {
      console.error('Error al eliminar obra:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Panel de Administración</h2>
      
      {/* Sección de Resumen de Obras Ofertadas */}
      <section className="mt-4">
        <h3>Obras Ofertadas</h3>
        <ul className="list-group">
          {obrasOfertadas.map((obra) => (
            <li key={obra.id} className="list-group-item">
              {obra.nombre} - Precio Ofertado: ${obra.precio}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección de Usuarios Registrados */}
      <section className="mt-4">
        <h3>Usuarios Registrados</h3>
        <ul className="list-group">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="list-group-item">
              {usuario.email} - Nivel: {usuario.level}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección de Crear/Modificar Artista */}
      <section className="mt-4">
        <h3>Crear/Modificar Artista</h3>
        <select className="form-control mb-2" onChange={handleArtistChange}>
          <option value="">Seleccionar Artista</option>
          {artistas.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.nombre}
            </option>
          ))}
        </select>

        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" className="form-control" value={artistFormData.nombre} onChange={handleArtistFormChange} />
          </div>
          <div className="form-group">
            <label>Biografía</label>
            <textarea name="biografia" className="form-control" value={artistFormData.biografia} onChange={handleArtistFormChange}></textarea>
          </div>
          <div className="form-group">
            <label>Nacionalidad</label>
            <input type="text" name="nacionalidad" className="form-control" value={artistFormData.nacionalidad} onChange={handleArtistFormChange} />
          </div>
          <div className="form-group">
            <label>Nacimiento</label>
            <input type="date" name="nacimiento" className="form-control" value={artistFormData.nacimiento} onChange={handleArtistFormChange} />
          </div>
          <div className="form-group">
            <label>Imagen URL</label>
            <input type="text" name="img" className="form-control" value={artistFormData.img} onChange={handleArtistFormChange} />
          </div>
          <button type="button" className="btn btn-success mt-2" onClick={handleUpdateArtist}>Actualizar Artista</button>
          <button type="button" className="btn btn-danger mt-2 ml-2" onClick={handleDeleteArtist}>Eliminar Artista</button>
        </form>
      </section>

      {/* Sección de Crear/Modificar Obra */}
      <section className="mt-4">
        <h3>Crear/Modificar Obra</h3>
        <select className="form-control mb-2" onChange={handleObraChange}>
          <option value="">Seleccionar Obra</option>
          {obras.map((obra) => (
            <option key={obra.id} value={obra.id}>
              {obra.nombre}
            </option>
          ))}
        </select>

        <form>
          <div className="form-group">
            <label>Artista</label>
            <select name="id_artista" className="form-control" value={obraFormData.id_artista} onChange={handleObraFormChange}>
              <option value="">Seleccionar Artista</option>
              {artistas.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" className="form-control" value={obraFormData.nombre} onChange={handleObraFormChange} />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" className="form-control" value={obraFormData.descripcion} onChange={handleObraFormChange}></textarea>
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" name="precio" className="form-control" value={obraFormData.precio} onChange={handleObraFormChange} />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select name="estado" className="form-control" value={obraFormData.estado} onChange={handleObraFormChange}>
              <option value="">Seleccionar Estado</option>
              <option value="1">Disponible</option>
              <option value="0">No disponible</option>
            </select>
          </div>
          <button type="button" className="btn btn-success mt-2" onClick={handleUpdateObra}>Actualizar Obra</button>
          <button type="button" className="btn btn-danger mt-2 ml-2" onClick={handleDeleteObra}>Eliminar Obra</button>
        </form>
      </section>
    </div>
  );
};

export default Admin;
