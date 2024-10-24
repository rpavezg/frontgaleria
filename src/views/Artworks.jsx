import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Ajusta el path según la estructura de tu proyecto


const Artworks = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get('/api/artworks')
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las obras:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Obras de arte</h2>
      <div className="row">
        {artworks.map(artwork => (
          <div className="col-md-4" key={artwork.id}>
            <div className="card">
              <img src={artwork.img} className="card-img-top" alt={artwork.nombre} />
              <div className="card-body">
                <h5 className="card-title">{artwork.nombre}</h5>
                <p className="card-text">{artwork.descripcion}</p>
                <p><strong>Precio:</strong> ${artwork.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artworks;
