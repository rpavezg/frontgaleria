import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start container-fluid sticky-bottom">
      <div className="text-center p-3 text-light">
        © 2024 Galería de Arte: 
        <a className="text-light" href="/"> Legales </a> | 
        <a className="text-light" href="/"> Contacto </a>
      </div>
    </footer>
  );
}

export default Footer;
