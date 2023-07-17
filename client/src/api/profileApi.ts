import { axiosInstance } from './axios';
import { UpdateUserInfo } from '../types/profile';

//getMyInfo
export const getMyInfoAPI = async () => {
  try {
    return await axiosInstance.get('/members');
  } catch (err) {
    console.error(err);
  }
};

//update
export const updateUserInfoAPI = async (data: UpdateUserInfo) => {
  try {
    return await axiosInstance.patch('/members', data);
  } catch (err) {
    console.error(err);
  }
};

//getWrittenCuratoions
export const getWrittenCuratoionsAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/curations?page=${page}&size=${size}`);
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

//getSubscribers
export const getSubscribersAPI = (page: number, size: number) => {
  try {
    return axiosInstance.get(`/members/subscribe?page=${page}&size=${size}`);
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
