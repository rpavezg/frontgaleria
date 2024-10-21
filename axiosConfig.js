import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia esto si tu backend está en un puerto o dominio diferente
});

export default axiosInstance;