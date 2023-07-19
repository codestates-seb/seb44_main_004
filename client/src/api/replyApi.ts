import { axiosInstance } from './axios';

//getReplies
export const getRepliesAPI = async (curationId: number, params: { page: number; size: number }) => {
  try {
    return await axiosInstance.get(`/curations/${curationId}/replies`, { params });
  } catch (err) {
    console.error(err);
  }
};

//postReply
export const postReplyAPI = async (curationId: number, data: { content: string }) => {
  try {
    return await axiosInstance.post(`/curations/${curationId}/replies`, data);
  } catch (err) {
    console.error(err);
  }
};

//updateReply
export const updateReplyAPI = async (replyId: number, data: { content: string }) => {
  try {
    return await axiosInstance.patch(`/curations/replies/${replyId}`, data);
  } catch (err) {
    console.error(err);
  }
};

//deleteeReply
export const deleteReplyAPI = async (replyId: number) => {
  try {
    return await axiosInstance.delete(`/curations/replies/${replyId}`);
  } catch (err) {
    console.error(err);
  }
};
