import { axiosInstance } from './axios';
import { IUserLoginData } from '../types/user';
import { typeGuard } from '../utils/typeGuard';
import { customAlert } from '../components/alert/sweetAlert';

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
    customAlert({
      title: '로그인 실패',
      text: '로그인을 다시한 번 확인해주세요.',
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#d33',
    });
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
 * social register
 */
export const socialRegisterAPI = async (data: FormData) => {
  try {
    return await axiosInstance.post('/members/social', data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * member info
 */
export const memberInfoAPI = async () => {
  try {
    return await axiosInstance.get(`/members/mypage`);
  } catch (err) {
    console.error(err);
    if (typeGuard<{ response: { data: { message: string } } }>(err, 'response')) {
      console.error(err.response.data.message);
      localStorage.removeItem('Authorization');
      alert('로그인을 해주세요 :(');
    }
  }
};

/**
 * get category
 */
export const categoryAPI = () => {
  return axiosInstance.get('/category');
};
