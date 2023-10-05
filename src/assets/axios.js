import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

export { axiosInstance };
