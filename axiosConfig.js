import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backendgaleria.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
