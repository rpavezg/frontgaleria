import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Artist = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Llamada para obtener los artistas desde el backend
    axios.get('/api/artists')
      .then(response => {
        setArtists(response.data);
      })
      .catch(error => {
        console.error("Error al cargar los artistas:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Artistas</h2>
      <div className="row">
        {artists.map(artist => (
          <div className="col-md-4" key={artist.id}>
            <div className="card">
              <img src={artist.img} className="card-img-top" alt={artist.nombre} />
              <div className="card-body">
                <h5 className="card-title">{artist.nombre}</h5>
                <p className="card-text">{artist.biografia}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;