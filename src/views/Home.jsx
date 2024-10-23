import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig'; // Asegúrate de que esta ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'bootstrap';

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
          <div className="carousel-item active">
            <img src="https://ibb.co/QJS1QLg" className="d-block w-100" alt="..." style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://ibb.co/ThSbRYq" className="d-block w-100" alt="..." style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://ibb.co/QPh9wR0" className="d-block w-100" alt="..." style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://ibb.co/tsk243j" className="d-block w-100" alt="..." style={{ margin: 0, padding: 0 }} />
          </div>
          <div className="carousel-item">
            <img src="https://ibb.co/fYmzhP2" className="d-block w-100" alt="..." style={{ margin: 0, padding: 0 }} />
          </div>
        </div>
      </div>

      {/* Sección de reseña de la galería */}
      <section className="container my-5 d-block w-100">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">Esta es una galería de arte que muestra las mejores obras de artistas contemporáneos y clásicos. Nuestro objetivo es conectar a los artistas con el público, promoviendo el arte y la cultura en todas sus formas.</p>
      </section>

      {/* Carrusel de artistas usando datos de la BD */}
      <section className="container my-5 d-block w-100">
        <div id="artistCarousel" className="carousel slide d-block w-100" data-bs-ride="carousel">
          <div className="carousel-inner">
            {artists.map((artist, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={artist.id}>
                <div className="d-flex justify-content-center">
                  <img
                    src={artist.img}
                    className="d-block"
                    alt={artist.nombre}
                    style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{artist.nombre}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#artistCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#artistCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
