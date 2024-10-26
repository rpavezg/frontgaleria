import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backendgaleria.onrender.com/api', // Ruta del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en cada solicitud
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
