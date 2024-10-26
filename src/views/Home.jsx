import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('/api/artists') // Solicitud correcta con el prefijo "/api" establecido en axiosConfig
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error al cargar los artistas:', error));
  }, []);

  return (
    <div>
      <h2>Artistas Destacados</h2>
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {artists.slice(0, 3).map((artist, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={artist.id}>
              <div className="card mb-3" style={{ maxWidth: '800px', height: '300px', margin: '0 auto' }}>
                <div className="row g-0" style={{ height: '100%' }}>
                  <div className="col-md-4">
                    <img
                      src={artist.img}
                      className="img-fluid rounded-start"
                      alt={artist.nombre}
                      style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body">
                      <h5 className="card-title text-center">{artist.nombre}</h5>
                      <p className="card-text text-center">{artist.biografia}</p>
                      <p className="card-text text-center">
                        <small className="text-muted">Nacionalidad: {artist.nacionalidad}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
