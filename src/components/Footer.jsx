import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div className="text-center p-3">
        © 2024 Galería de Arte: 
        <a className="text-light" href="/"> Legales </a> | 
        <a className="text-light" href="/"> Contacto </a>
      </div>
    </footer>
  );
}

export default Footer;
