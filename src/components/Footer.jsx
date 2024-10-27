import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        © 2024 Galería de Arte: 
        <a className="text-dark" href="/"> Legales </a> | 
        <a className="text-dark" href="/"> Contacto </a>
      </div>
    </footer>
  );
}

export default Footer;
