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
    } else if (
      typeGuard<{ response: { data: { status: number; message: string } } }>(err, 'response') &&
      err.response.data.status === 500
    ) {
      customAlert({
        title: '서버 에러 발생',
        text: '서버에러가 발생했습니다. 관리자가 확인중입니다.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#C51605',
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
    // 임시) 회원탈퇴 후에 로그인 처리가 되어 토큰이 넘어옴 -> 마이페이지 정보 불러올 때 에러 핸들링 (서버에서 처리 필요)
    console.error(err);
    if (typeGuard<{ response: { data: { status: number; message: string } } }>(err, 'response')) {
      const { status, message } = err.response.data;
      localStorage.removeItem('Authorization');
      if (status === 404 && message === '이메일이 존재하지 않거나, 비밀번호가 불일치합니다.')
        customAlert({
          title: '로그인 확인 필요',
          text: '이메일이 존재하지 않거나, 비밀번호가 불일치합니다.',
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#d33',
        });
    }
  }
};

/**
 * get category
 */
export const categoryAPI = () => {
  return axiosInstance.get('/category');
};
