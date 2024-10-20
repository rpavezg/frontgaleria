import React from 'react';

function Home() {
  return (
    <div className="container">
      <h1>Bienvenido a la Galería de Arte</h1>
      {/* Carrusel de imágenes */}
      <div className="carousel slide" id="carouselExample" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/path-to-image.jpg" className="d-block w-100" alt="..." />
          </div>
          {/* Añadir más imágenes aquí */}
        </div>
      </div>

      {/* Sección de reseña de la galería */}
      <section>
        <h2>Sobre la Galería</h2>
        <p>Esta es una galería de arte que muestra las mejores obras...</p>
      </section>

      {/* Carrusel de artistas */}
      <section>
        <h2>Artistas Destacados</h2>
        {/* Carrusel con fotos y biografías de artistas */}
      </section>
    </div>
  );
}

export default Home;