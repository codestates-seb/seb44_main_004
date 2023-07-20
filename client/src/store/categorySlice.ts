import { createSlice } from '@reduxjs/toolkit';

export interface CategoryState {
  categories: string[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    saveCategories: (state, action) => {
      state.categories = [...action.payload];
    },
  },
});

export const { saveCategories } = categorySlice.actions;

export default categorySlice.reducer;
