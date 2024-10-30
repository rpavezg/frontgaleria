import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backendgaleria.onrender.com/api',
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
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas de error, como el 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      if (process.env.NODE_ENV === 'production') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
