import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backendgaleria.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las solicitudes
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
