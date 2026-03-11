import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // In a real browser environment, you might get this from localStorage or a standard cookie
    // For Next.js App Router, API routes usually handle their own cookies, 
    // but if we are passing a Bearer token:
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors (e.g., 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login or clear store
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // window.location.href = '/auth/login'; // Optional: auto-redirect
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
