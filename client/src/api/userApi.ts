import { axiosInstance } from './axios';
import { IUserLoginData, /* IUserRegisterData */ } from '../types/user';
import { typeGuard } from '../utils/typeGuard';

/**
 * login 
 */ 
export const loginAPI = async (data: IUserLoginData) => {
  try {
    const response = await axiosInstance.post('/login', data);
    if (response) {
      const { authorization } = response.headers;
      localStorage.setItem('Authorization', authorization);
    }
    return response;
  } catch (err) {
    console.error(err);
  }
};

/**
 * register
 */
export const registerAPI = async (data: FormData) => {
  try {
    return await axiosInstance.post('/members', data);
  } catch (err) {
    console.error(err);
  }
};

/**
 * member info
 */
export const memberInfoAPI = async () => {
  try {
    return await axiosInstance.get(`/members`);
  } catch (err) {
    console.error(err);
    if (typeGuard<{ response: { data: { message: string } } }>(err, 'response')) {
      console.error(err.response.data.message);
      localStorage.removeItem('Authorization');
      alert('로그인을 해주세요 :(');
    }
  }
};
