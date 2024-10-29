import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
import Likes from './views/Likes'; 
import Offers from './views/Offers'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';  
import { AuthProvider } from './context/AuthContext';  
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
          <div className="form-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<PrivateRoute levelRequired={1}><Admin /></PrivateRoute>} />
              <Route path="/admin/create-artist" element={<PrivateRoute levelRequired={1}><CreateModifyArtist /></PrivateRoute>} />
              <Route path="/admin/create-artwork" element={<PrivateRoute levelRequired={1}><CreateModifyArtwork /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute levelRequired={2}><Profile /></PrivateRoute>} />
              <Route path="/artworks" element={<PrivateRoute levelRequired={2}><Artworks /></PrivateRoute>} />
              <Route path="/artworks/:id" element={<PrivateRoute levelRequired={2}><ArtworkDetail /></PrivateRoute>} />
              <Route path="/likes" element={<PrivateRoute levelRequired={2}><Likes /></PrivateRoute>} />
              <Route path="/offers" element={<PrivateRoute levelRequired={2}><Offers /></PrivateRoute>} />
            </Routes>
          </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
