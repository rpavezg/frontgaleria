import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav align-content-end">
            <Link className="nav-link" to="/artists">Artistas</Link>
            <Link className="nav-link" to="/register">Registrarse</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/contact">Contacto</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

    //<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
    //  <div className="container-fluid ">
      //  <Link className="navbar-brand" to="/">Isotipo</Link>
        //<div className="collapse navbar-collapse">
          //<ul className="navbar-nav me-auto">
            //<li className="nav-item">
              //<Link className="nav-link" to="/artists">Artistas</Link>
            //</li>
            //<li className="nav-item">
              //<Link className="nav-link" to="/register">Registrarse</Link>
            //</li>
            //<li className="nav-item">
              //<Link className="nav-link" to="/login">Login</Link>
            //</li>
            //<li className="nav-item">
              //<Link className="nav-link" to="/contact">Contacto</Link>
            //</li>
          //</ul>
        //</div>
      //</div>
    //</nav>
