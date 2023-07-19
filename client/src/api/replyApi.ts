import { axiosInstance } from './axios';

export interface paramsProps {
  page: number;
  size: number;
}
//getReplies
export const getRepliesAPI = async (curationId: string, params: paramsProps) => {
  try {
    return await axiosInstance.get(`/curations/${curationId}/replies`, { params });
  } catch (err) {
    console.error(err);
  }
};
