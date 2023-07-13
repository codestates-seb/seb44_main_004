import { axiosInstance } from './axios';

import { UpdateUserInfo } from '../types/profile';

//get
export const getUserInfoAPI = async () => {
  try {
    return await axiosInstance.get('/members');
  } catch (err) {
    console.log(err);
  }
};

//update
export const updateUserInfoAPI = async (data: UpdateUserInfo) => {
  try {
    return await axiosInstance.patch('/members', data);
  } catch (err) {
    console.log(err);
  }
};

//getWrittenCuratoions
export const getWrittenCuratoions = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/curations?page=${page}&size=${size}`);
  } catch (err) {
    console.log(err);
  }
};

//getSubscribers
export const getSubscribersAPI = (page: number, size: number) => {
  try {
    return axiosInstance.get(`/members/subscribe?page=${page}&size=${size}`);
  } catch (err) {
    console.log(err);
  }
};

//postSubscriber
export const postSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.post(`/subscribes/${memberId}`);
  } catch (err) {
    console.log(err);
  }
};

//deleteSubscriber
export const deleteSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.delete(`/subscribes/${memberId}`);
  } catch (err) {
    console.log(err);
  }
};
