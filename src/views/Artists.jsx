import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 6; // 6 artistas por página, 3 columnas x 2 filas

  useEffect(() => {
    axios.get('/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error al cargar los artistas:', error));
  }, []);

  // Obtener los artistas para la página actual
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="artists-page">
      <div className="container">
        <h2 className="text-center my-4">Nuestros Artistas</h2>
        
        <div className="row">
          {currentArtists.map((artist) => (
            <div className="col-md-4 mb-4" key={artist.id}>
              <div className="card h-100">
                <img src={artist.img} className="card-img-top" alt={artist.nombre} />
                <div className="card-body">
                  <h5 className="card-title">{artist.nombre}</h5>
                  <p className="card-text">{artist.biografia}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
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
    </div>
  );
};

export default Artists;
