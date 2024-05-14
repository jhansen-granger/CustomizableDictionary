// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api' // Adjust this base URL if needed
});

export default api;
