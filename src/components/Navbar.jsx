import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ArtNV</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav align-content-end">
            {!user || user.level === 1 ? ( // Mostrar enlace "Artistas" solo para visitantes y usuarios nivel 1
              <Link className="nav-link" to="/artists">Artistas</Link>
            ) : (
              <Link className="nav-link" to="/artworks">Obras</Link> // Mostrar enlace "Obras" solo para nivel 2
            )}
            {!user ? (
              <>
                <Link className="nav-link" to="/register">Registrarse</Link>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/contact">Contacto</Link>
              </>
            ) : (
              <>
                {user.level === 1 && (
                  <>
                    <Link className="nav-link" to="/admin/create-artist">Crear o Modificar Artista</Link>
                    <Link className="nav-link" to="/admin/create-artwork">Crear o Modificar Obra</Link>
                  </>
                )}
                {user.level === 2 && (
                  <>

                <Link className="nav-link" to="/likes">Me gusta</Link>
                <Link className="nav-link" to="/offers">Ofertados</Link>
                <Link className="nav-link" to="/profile">Mi Perfil</Link>
                  </>
                )}
                <Link className="nav-link" to="/" onClick={logout}>Cerrar Sesión</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
