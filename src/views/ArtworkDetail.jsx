import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosConfig'; 

const ArtworkDetail = () => {
  const { id } = useParams();  // obtener id obra desde url
  const [artwork, setArtwork] = useState({});
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Detalle obras por id
    axios.get(`/artworks/${id}`)
      .then(response => {
        setArtwork(response.data);
      })
      .catch(error => {
        console.error("Error al cargar la obra de arte:", error);
      });
  }, [id]);

  const handleLike = () => {
    // Me gusta
    axios.post(`/artworks/${id}/like`)
      .then(response => {
        setLikes(likes + 1);
      })
      .catch(error => {
        console.error("Error al dar me gusta:", error);
      });
  };

  const handleBid = () => {
    // Ofertar
    const bidAmount = prompt("Ingresa el monto de tu oferta:");
    if (bidAmount) {
      axios.post(`/artworks/${id}/bid`, { bid: bidAmount })
        .then(response => {
          alert("Oferta realizada con éxito");
        })
        .catch(error => {
          console.error("Error al hacer la oferta:", error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Detalle de la Obra</h2>
      {artwork ? (
        <div className="row">
          <div className="col-md-6">
            <img src={artwork.img} className="img-fluid" alt={artwork.nombre} />
          </div>
          <div className="col-md-6">
            <h3>{artwork.nombre}</h3>
            <p>{artwork.descripcion}</p>
            <p><strong>Precio:</strong> ${artwork.precio}</p>
            <p><strong>Estado:</strong> {artwork.estado === 1 ? 'Disponible' : 'No disponible'}</p>
            <p><strong>Me gusta:</strong> {likes}</p>
            <button className="btn btn-success me-2" onClick={handleLike}>Me gusta</button>
            <button className="btn btn-primary" onClick={handleBid}>Hacer una oferta</button>
          </div>
        </div>
      ) : (
        <p>Cargando los detalles de la obra...</p>
      )}
    </div>
  );
};

export default ArtworkDetail;
