import { axiosInstance } from './axios';

// Best Curation Page API (좋아요 수가 많은 순으로 정렬)
export const mostLikedCurationAPI = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get('/curations/new?page=1&size=9');
    return data;
  } catch (error) {
    console.error(error);
  }
};

// New Curation Page API (가장 최근에 등록된 순으로 정렬)
export const newlyRegisteredCurationAPI = async () => {
  try {
    return await axiosInstance.get('/curations/new?page=1&size=9');
  } catch (error) {
    console.error(error);
  }
};
