import { axiosInstance } from './axios';
/**
 * Best Curator Section API (구독자 수 기반으로 베스트 선정)
 */
export const bestCuratorsAPI = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get('/members/best?page=1&size=5');
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Best Curation Section API (좋아요 수가 많은 순으로 정렬)
 */
export const highestLikeCurationAPI = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get('/curations/best?page=1&size=3');
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * New Curation Section API (가장 최근에 등록된 순으로 정렬)
 */
export const recentlyRegisteredCurationAPI = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get('/curations/new?page=1&size=3');
    return data;
  } catch (error) {
    console.error(error);
  }
};
