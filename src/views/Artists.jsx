import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 4;

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

  // Calcular los artistas para la página actual
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

  // Manejar el cambio de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="text-center mb-4">Artistas</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {currentArtists.map((artist) => (
          <div
            className="card mb-3"
            style={{
              maxWidth: '800px',
              width: '100%',
              height: '300px', // Establece una altura uniforme para todas las cards
              display: 'flex',
              justifyContent: 'center'
            }}
            key={artist.id}
          >
            <div className="row g-0" style={{ height: '100%' }}>
              <div className="col-md-4">
                <img
                  src={artist.img}
                  className="img-fluid rounded-start"
                  alt={artist.nombre}
                  style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                  }} // Ajusta la imagen para llenar completamente el contenedor
                />
              </div>
              <div className="col-md-8 d-flex align-items-center">
                <div className="card-body">
                  <h5 className="card-title text-center">{artist.nombre}</h5>
                  <p className="card-text text-start" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {artist.biografia}
                  </p>
                  <p className="card-text text-end">
                    <small className="text-muted">Nacionalidad: {artist.nacionalidad}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(artists.length / artistsPerPage) }).map((_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Artists;