import { axiosInstance } from './axios';

// Best Curation Page API (좋아요 수가 많은 순으로 정렬)
export const LikedCurationAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/curations/best?&page=${page}&size=${size}`);
  } catch (error) {
    console.error(error);
  }
}

// Best Curation Page + Category API (좋아요 수가 많은 순으로 정렬 + 카테고리 선택)
export const LikedCurationCategoryAPI = async (page: number, size: number, category_id: number) => {
  try {
    return await axiosInstance.get(`/curations/best?&page=${page}&size=${size}&category=${category_id}`);
    } catch (error) {
    console.error(error);
  }
};

// New Curation Page API (가장 최근에 등록된 순으로 정렬)
export const newlyCurationAPI = async (page: number, size: number) => {
  try {
    return await axiosInstance.get(`/curations/new?&page=${page}&size=${size}`);
  } catch (error) {
    console.error(error);
  }
};

// New Curation Page + Category API (가장 최근에 등록된 순으로 정렬 + 카테고리 선택)
export const newlyCurationCategoryAPI = async (page: number, size: number, category_id: number) => {
  try {
    return await axiosInstance.get(`/curations/new?&page=${page}&size=${size}&category=${category_id}`);
  } catch (error) {
    console.error(error);
  }
};