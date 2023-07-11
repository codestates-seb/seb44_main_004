import axios, { InternalAxiosRequestConfig } from 'axios';

export const { VITE_SERVER_URL } = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (!config.headers) return config;

  const token: string | null = localStorage.getItem('Authorization');
  config.headers.Authorization = `${token}`;

  return config;
});
