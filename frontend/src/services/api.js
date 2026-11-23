/* eslint-disable no-new-func */
import axios from 'axios';

let baseURL = '/api';

try {
  const env = new Function('try { return import.meta.env; } catch(e) { return null; }')();
  if (env && env.VITE_API_BASE_URL) {
    baseURL = env.VITE_API_BASE_URL;
  }
} catch {
  // Fallback for non-ESM / Jest environments
}

const isTest = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';

if (isTest) {
  baseURL = '/api';
} else if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) {
  baseURL = process.env.REACT_APP_API_BASE_URL;
} else if (baseURL === '/api' && typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost' && window.location.port !== '8081') {
  baseURL = 'http://localhost:8081/api';
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Ignore in non-browser environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle common error codes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
      } catch {
        // Ignore
      }
    }
    return Promise.reject(error);
  }
);

export default api;
