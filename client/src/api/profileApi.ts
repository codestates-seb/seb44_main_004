import { axiosInstance } from './axios';
import { typeGuard } from '../utils/typeGuard';
import { customAlert } from '../components/alert/sweetAlert';

//getMyInfo
export const getMyInfoAPI = async () => {
  try {
    return await axiosInstance.get('/members/mypage');
  } catch (err) {
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

//update
export const updateUserInfoAPI = async (data: FormData) => {
  try {
    return await axiosInstance.patch('/members', data);
  } catch (err) {
    console.error(err);
  }
};

//getWrittenCuratoions
export const getWrittenCuratoionsAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/mypage/curations?page=${page}&size=${size}`);
  } catch (err) {
    console.error(err);
  }
};

//getUserWrittenCurations
export const getUserWrittenCurationsAPI = async (memberId: number, page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/curations/${memberId}?page=${page}&size=${size}`);
  } catch (err) {
    console.error(err);
  }
};

//getLikeCuratoions
export const getLikeCuratoionsAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/mypage/like?page=${page}&size=${size}`);
  } catch (err) {
    console.error(err);
  }
};

//getUserLikeCurations
export const getUserLikeCurationsAPI = async (memberId: number, page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/like/${memberId}?page=${page}&size=${size}`);
  } catch (err) {
    console.error(err);
  }
};
//getSubscribers
export const getSubscribersAPI = (page: number, size: number) => {
  try {
    return axiosInstance.get(`/members/mypage/subscribe?page=${page}&size=${size}`);
  } catch (err) {
    console.error(err);
  }
};

//getUserInfo
export const getUserInfoAPI = async (memberId: number) => {
  try {
    return await axiosInstance.get(`/members/${memberId}`);
  } catch (err) {
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

//postSubscriber
export const postSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.post(`/subscribes/${memberId}`);
  } catch (err) {
    console.error(err);
  }
};

//deleteSubscriber
export const deleteSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.delete(`/subscribes/${memberId}`);
  } catch (err) {
    console.error(err);
  }
};

//memberOut
export const memberOutAPI = async () => {
  try {
    const response = await axiosInstance.delete(`/members`);
    if (response.status === 204) {
      localStorage.removeItem('Authorization');
    }
    return response;
  } catch (err) {
    console.error(err);
  }
};
