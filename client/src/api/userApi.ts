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
    if (
      typeGuard<{ response: { data: { status: number; message: string } } }>(err, 'response') &&
      err.response.data.status === 401
    ) {
      localStorage.removeItem('Authorization');
      customAlert({
        title: '로그인을 해주세요.',
        text: '로그인 유효기간이 만료되었습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
    } else {
      customAlert({
        title: '로그인 실패',
        text: '이메일이 존재하지 않거나, 비밀번호가 불일치합니다.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#d33',
      });
      console.error(err);
    }
  }
};

/**
 * register
 */
export const registerAPI = async (data: FormData) => {
  try {
    return await axiosInstance.post('/members', data);
  } catch (err) {
    if (
      typeGuard<{ response: { data: { status: number; message: string } } }>(err, 'response') &&
      err.response.data.status === 409
    ) {
      const { message } = err.response.data;
      let title = '';
      let text = '';
      if (message === '사용자가 이미 존재 합니다.') {
        title = '이미 가입된 이메일이네요!';
        text = '다른 이메일로 가입을 진행해주세요. :)';
      } else {
        title = '이미 사용중인 닉네임이네요!';
        text = '다른 닉네임을 사용해주세요. :)';
      }
      customAlert({
        title,
        text,
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#F1C93B',
      });
    }
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
    }
  }
};

/**
 * get category
 */
export const categoryAPI = () => {
  return axiosInstance.get('/category');
};
