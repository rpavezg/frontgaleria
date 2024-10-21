import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav align-content-end">
            <a className="nav-link" href="/artists">Artistas</a>
            <a className="nav-link" href="/register">Registrarse</a>
            <a className="nav-link" href="/login">Login</a>
            <a className="nav-link" ahref="/contact">Contacto</a>
          </div>
        </div>
      </div>
    </nav>
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
  );
}

export default Navbar;