import axios, { InternalAxiosRequestConfig } from 'axios';

import { VITE_SERVER_URL } from '../types/envVariable';

export const axiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) return config;

  const token: string | null = localStorage.getItem('Authorization');
  config.headers.Authorization = `${token}`;

  return config;
});

// 'ngrok-skip-browser-warning': true,
