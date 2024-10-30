// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [artists, setArtists] = useState([]);

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

  return (
    <div className="home-page">
      {/* Carrusel de ancho completo */}
      <div className="carousel-container">
        <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://i.ibb.co/zm90xpM/1-artNV.jpg" className="d-block w-100" alt="1-artNV" />
            </div>
            <div className="carousel-item">
              <img src="https://i.ibb.co/zm90xpM/2-artNV.jpg" className="d-block w-100" alt="2-artNV" />
            </div>
            <div className="carousel-item">
              <img src="https://i.ibb.co/zm90xpM/3-artNV.jpg" className="d-block w-100" alt="3-artNV" />
            </div>
          </div>
        </div>
      </div>

      <section className="info-section container my-5">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">
          Esta es una galería de arte que muestra las mejores obras de artistas contemporáneos y clásicos. Nuestro objetivo es conectar a los artistas con el público, promoviendo el arte y la cultura en todas sus formas.
        </p>
      </section>

      <section className="container artist-carousel my-5">
        <h2 className="text-center">Artistas Destacados</h2>
        <div id="artistCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {artists.slice(0, 3).map((artist, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={artist.id}>
                <div className="card mb-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={artist.img} className="img-fluid rounded-start" alt={artist.nombre} />
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                      <div className="card-body">
                        <h5 className="card-title">{artist.nombre}</h5>
                        <p className="card-text">{artist.biografia}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
