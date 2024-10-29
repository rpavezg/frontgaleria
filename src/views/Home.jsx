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
    <div className="container-fluid p-0">
      {/* Carousel de bienvenida */}
      <div id="welcomeCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/1-artNV.jpg" alt="1-artNV" className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/2-artNV.jpg" alt="2-artNV" className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/3-artNV.jpg" alt="3-artNV" className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/4-artNV.jpg" alt="4-artNV" className="d-block w-100" />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/5-artNV.jpg" alt="5-artNV" className="d-block w-100" />
          </div>
        </div>
      </div>

      {/* Sección de información de la galería */}
      <section className="content-centered mt-5">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center mx-auto" style={{ maxWidth: '800px' }}>
          Bienvenido a nuestra galería de arte, un espacio dedicado a las obras más destacadas de artistas tanto contemporáneos como clásicos. 
          Nuestro objetivo es conectar a los artistas con el público, promoviendo el arte y la cultura en todas sus formas.
        </p>
      </section>

      {/* Carousel de artistas destacados */}
      <section className="content-centered mt-5">
        <h2 className="text-center">Artistas Destacados</h2>
        <div id="featuredArtistsCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            {artists.slice(0, 3).map((artist, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={artist.id}>
                <div className="card mx-auto" style={{ maxWidth: '800px', height: '300px' }}>
                  <div className="row g-0 h-100">
                    <div className="col-md-4">
                      <img
                        src={artist.img}
                        className="img-fluid rounded-start h-100 w-100"
                        alt={artist.nombre}
                        style={{ objectFit: 'cover' }}
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
          <button className="carousel-control-prev" type="button" data-bs-target="#featuredArtistsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#featuredArtistsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
