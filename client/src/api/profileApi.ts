import { axiosInstance } from './axios';

import { UpdateUserInfo } from '../types/profile';

//get
export const getUserInfoAPI = async () => {
  try {
    return await axiosInstance.get('/members/curations');
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

//getSubscribers
export const getSubscribersAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/members/subscribe?page=${page}&size=${size}`);
  } catch (err) {
    console.log(err);
  }
};

//postSubscriber
export const postSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.post(`/members/subscribes/${memberId}`);
  } catch (err) {
    console.log(err);
  }
};

//deleteSubscriber
export const deleteSubscribeAPI = async (memberId: number) => {
  try {
    return await axiosInstance.delete(`/members/subscribes/${memberId}`);
  } catch (err) {
    console.log(err);
  }
};
