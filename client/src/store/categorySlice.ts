import { createSlice } from '@reduxjs/toolkit';
interface CategoryTagValue {
  name: string;
  categoryId: number;
}
export interface CategoryState {
  categories: CategoryTagValue[];
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
