import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 6; 

  useEffect(() => {
    axios.get('/protected/artworks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las obras:", error);
      });
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.post(`/protected/artworks/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("¡Obra marcada con 'Me gusta'!");
    } catch (error) {
      console.error("Error al registrar 'Me gusta':", error);
      alert("Error al registrar 'Me gusta'");
    }
  };

  const handleBid = async (id) => {
    try {
      await axios.post(`/protected/artworks/${id}/bid`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("Oferta registrada con éxito");
    } catch (error) {
      console.error("Error al registrar la oferta:", error);
      alert("Error al registrar la oferta");
    }
  };

  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = artworks.slice(indexOfFirstArtwork, indexOfLastArtwork);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content-centered">
      <h2 className="text-center">Obras de Arte</h2>
      <div className="card-container">
        {currentArtworks.map(artwork => (
          <div className="card artwork-card" key={artwork.id}>
            <img src={artwork.img} className="card-img-top" alt={artwork.nombre} />
            <div className="card-body">
              <h5 className="card-title">{artwork.nombre}</h5>
              <p className="card-text">{artwork.descripcion}</p>
              <p><strong>Precio:</strong> ${artwork.precio}</p>
              <button className="btn btn-primary me-2" onClick={() => handleLike(artwork.id)}>Me gusta</button>
              <button className="btn btn-secondary" onClick={() => handleBid(artwork.id)}>Ofertar</button>
            </div>
          </div>
        ))}
      </div>

      <nav className="pagination-nav mt-4">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(artworks.length / artworksPerPage) }).map((_, index) => (
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

export default Artworks;
