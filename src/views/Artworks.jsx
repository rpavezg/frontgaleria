import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig'; 

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get('/api/protected/artworks')
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las obras:", error);
      });
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.post(`/api/protected/artworks/${id}/like`);
      alert("¡Obra marcada con 'Me gusta'!");
    } catch (error) {
      console.error("Error al registrar 'Me gusta':", error);
    }
  };

  const handleBid = async (id) => {
    const bidAmount = prompt("Ingresa el monto de tu oferta:");
    if (bidAmount) {
      try {
        await axios.post(`/api/protected/artworks/${id}/bid`, { bid: bidAmount });
        alert("Oferta realizada con éxito");
      } catch (error) {
        console.error("Error al realizar la oferta:", error);
      }
    }
  };

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
                <button className="btn btn-primary me-2" onClick={() => handleLike(artwork.id)}>Me gusta</button>
                <button className="btn btn-secondary" onClick={() => handleBid(artwork.id)}>Ofertar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artworks;
