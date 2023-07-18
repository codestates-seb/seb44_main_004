import axios, { InternalAxiosRequestConfig } from 'axios';

import { VITE_SERVER_URL } from '../utils/envValiable';

export const axiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) return config;

  const token: string | null = localStorage.getItem('Authorization');
  config.headers.Authorization = `${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error.response.status === 404) {
      window.location.href = 'http://localhost:5173/error/404';
    } else if (error.response.status === 500) {
      window.location.href = 'http://localhost:5173/error/500';
    }
  }
);
