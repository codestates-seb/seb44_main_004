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
