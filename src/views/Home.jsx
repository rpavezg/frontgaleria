import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('/artists'); // Ajusta la ruta si es necesario
        setArtists(response.data);
      } catch (error) {
        console.error('Error al cargar los artistas:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      {/* Carousel de imágenes pegado al Navbar y ocupando todo el ancho */}
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ margin: 0 }}>
        <div className="carousel-inner">
          {/* Aquí van las imágenes del carousel */}
        </div>
      </div>

      {/* Sección de reseña de la galería */}
      <section className="container my-5 d-block w-100">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">Esta es una galería de arte que muestra las mejores obras...</p>
      </section>

      {/* Carrusel de artistas usando datos de la BD */}
      <section className="container my-5 d-block w-100">
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
      </section>
    </div>
  );
}

export default Home;
