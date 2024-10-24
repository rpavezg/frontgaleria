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

  // Dividir los artistas en grupos de 3
  const chunkedArtists = [];
  for (let i = 0; i < artists.length; i += 3) {
    chunkedArtists.push(artists.slice(i, i + 3));
  }

  return (
    <div>
      {/* Carousel de imágenes pegado al Navbar y ocupando todo el ancho */}
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ margin: 0 }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/1-artNV.jpg" alt="1-artNV" className="d-block w-100" style={{ margin: 0, padding: 0 }} />
          </div>
          {/* Agrega más imágenes según sea necesario */}
        </div>
      </div>

      {/* Sección de reseña de la galería */}
      <section className="container my-5">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">Esta es una galería de arte que muestra las mejores obras de artistas contemporáneos y clásicos. Nuestro objetivo es conectar a los artistas con el público, promoviendo el arte y la cultura en todas sus formas.</p>
      </section>

      {/* Carrusel de artistas usando datos de la BD */}
      <section className="container my-5">
        <h2 className="text-center">Artistas Destacados</h2>
        <div id="artistCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {chunkedArtists.map((artistGroup, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="d-flex justify-content-center">
                  {artistGroup.map((artist) => (
                    <div
                      className="card mb-3 mx-2"
                      style={{
                        maxWidth: '300px',
                        width: '100%',
                        height: '350px',
                      }}
                      key={artist.id}
                    >
                      <div className="row g-0" style={{ height: '100%' }}>
                        <div className="col-md-12">
                          <img
                            src={artist.img}
                            className="img-fluid rounded-start"
                            alt={artist.nombre}
                            style={{
                              objectFit: 'cover',
                              height: '200px',
                              width: '100%',
                            }}
                          />
                        </div>
                        <div className="col-md-12">
                          <div className="card-body">
                            <h5 className="card-title text-center">{artist.nombre}</h5>
                            <p className="card-text text-center" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {artist.biografia}
                            </p>
                            <p className="card-text text-center">
                              <small className="text-muted">Nacionalidad: {artist.nacionalidad}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
