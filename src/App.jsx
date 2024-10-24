import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Usar HashRouter para evitar problemas de redirección
import Home from './views/Home';
import Artists from './views/Artists';
import Register from './views/Register';
import Login from './views/Login';
import Admin from './views/Admin';
import Profile from './views/Profile';
import Artworks from './views/Artworks';
import ArtworkDetail from './views/ArtworkDetail';
import CreateModifyArtist from './views/CreateModifyArtist';
import CreateModifyArtwork from './views/CreateModifyArtwork';
import Contact from './views/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';  
import { AuthProvider } from './context/AuthContext';  
import './index.css';
import './App.css'; 

function App() {
  return (
    <AuthProvider>  {/* Proveedor del contexto de autenticación */}
      <Router>
        <Navbar />  {/* Navbar con enlaces a las diferentes secciones */}
        <div style={{ minHeight: 'calc(100vh - 200px)' }}> {/* Asegura que el contenido ocupe el espacio necesario */}
          <Routes>
            {/* Rutas del área pública */}
            <Route path="/" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />

            {/* Rutas del área privada, protegidas según el nivel de usuario */}
            <Route
              path="/admin"
              element={
                <PrivateRoute levelRequired={1}>  {/* Protege esta ruta solo para level 1 */}
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/create-artist"
              element={
                <PrivateRoute levelRequired={1}>  {/* Protege esta ruta solo para level 1 */}
                  <CreateModifyArtist />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/create-artwork"
              element={
                <PrivateRoute levelRequired={1}>  {/* Protege esta ruta solo para level 1 */}
                  <CreateModifyArtwork />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute levelRequired={2}>  {/* Protege esta ruta solo para level 2 */}
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/artworks"
              element={
                <PrivateRoute levelRequired={2}>  {/* Protege esta ruta solo para level 2 */}
                  <Artworks />
                </PrivateRoute>
              }
            />
            <Route
              path="/artworks/:id"
              element={
                <PrivateRoute levelRequired={2}>  {/* Protege esta ruta solo para level 2 */}
                  <ArtworkDetail />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />  {/* Footer con enlaces y redes sociales */}
      </Router>
    </AuthProvider>
  );
}

export default App;
