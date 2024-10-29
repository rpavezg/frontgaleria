import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error al cargar los artistas:', error));
  }, []);

  return (
    <div className="content-centered">
      <h2>Nuestros Artistas</h2>
      <div className="card-container">
        {artists.map((artist) => (
          <div className="card" key={artist.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={artist.img}
                  className="img-fluid rounded-start"
                  alt={artist.nombre}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{artist.nombre}</h5>
                  <p className="card-text">{artist.biografia}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
