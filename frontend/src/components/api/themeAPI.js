// src/api/index.js
import axios from 'axios';

export const ENDPOINTS = {
  users: {
    current: '/api/users/current',
    theme: '/api/users/current/theme',
  },
};

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // ajustează dacă ai proxy
  headers: {
    'Content-Type': 'application/json',
  },
});
