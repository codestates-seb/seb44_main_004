import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';
import categorySlice from './categorySlice';
import repliesSlice from './repliesSlice';

export const store = configureStore({
  reducer: { user: userSlice, modal: modalSlice, categories: categorySlice, replies: repliesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
