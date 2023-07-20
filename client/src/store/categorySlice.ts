import { createSlice } from '@reduxjs/toolkit';

export const categoryData = {
  names: [
    '건강',
    '경영/경제',
    '과학/공학',
    '만화',
    '문학',
    '사회과학',
    '소설',
    '수험서',
    '스포츠',
    '시/에세이',
    '역사/문화',
    '외국어',
    '여행',
    '요리',
    '유아',
    '인문',
    '자기계발',
    '잡지',
    '정치/사회',
    '종교',
    '재테크',
    '커리어',
    'IT',
  ],
};
export interface CategoryState {
  categories: string[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    saveCategories: (state, action) => {
      state.categories = [...action.payload];
    },
  },
});

export const { saveCategories } = categorySlice.actions;

export default categorySlice.reducer;
