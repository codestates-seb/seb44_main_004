import { axiosInstance } from './axios';

import { IUserLoginData, IUserRegisterData } from '../types/user';

// login
export const loginAPI = async (data: IUserLoginData) => {
  try {
    const response = await axiosInstance.post('/login', data);
    if (response) {
      const { authorization } = response.headers;
      localStorage.setItem('Authorization', authorization);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

// register
export const registerAPI = async (data: IUserRegisterData) => {
  try {
    return await axiosInstance.post('/members', data);
  } catch (err) {
    console.log(err);
  }
};
