import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artists'); // Usa el prefijo "/api" configurado en axiosConfig
        setArtists(response.data);
      } catch (error) {
        console.error('Error al cargar los artistas:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ margin: 0 }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/1-artNV.jpg" alt="1-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/2-artNV.jpg" alt="2-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/3-artNV.jpg" alt="3-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/4-artNV.jpg" alt="4-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://i.ibb.co/zm90xpM/5-artNV.jpg" alt="5-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
        </div>
      </div>

      {/* Sección de reseña de la galería */}
      <section className="container my-5 d-block w-100">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">
          Esta es una galería de arte que muestra las mejores obras de artistas contemporáneos y clásicos. Nuestro objetivo es conectar a los artistas con el público, promoviendo el arte y la cultura en todas sus formas.
        </p>
      </section>

      {/* Carrusel de artistas destacados */}
      <section className="container my-5 d-block w-100">
      <h2 className='text-center' >Artistas Destacados</h2>
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
      </section>
    </div>
  );
}

export default Home;
