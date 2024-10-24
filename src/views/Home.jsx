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
    <div>
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ margin: 0 }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/1-artNV.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/2-artNV.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/3-artNV.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/4-artNV.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item active">
            <img src="https://i.ibb.co/zm90xpM/5-artNV.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>

      <section className="section-full-width my-5">
        <h2 className="text-center">Sobre la Galería</h2>
        <p className="text-center">Esta es una galería de arte que muestra las mejores obras...</p>
      </section>

      <section className="section-full-width my-5">
        <h2 className="text-center">Artistas Destacados</h2>
        <div id="artistCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {artists.map((artist, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={artist.id}>
                <img src={artist.img} className="d-block w-100" alt={artist.nombre} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{artist.nombre}</h5>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#artistCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#artistCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
