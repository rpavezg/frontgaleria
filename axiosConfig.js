import axios from 'axios';

// Crear una instancia de Axios con la configuración de la URL base
const instance = axios.create({
  baseURL: 'https://backendgaleria.onrender.com/api', // URL base de tu backend en Render
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
