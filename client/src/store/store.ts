import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';
import categorySlice from './categorySlice';

export const store = configureStore({
  reducer: { user: userSlice, modal: modalSlice, categories: categorySlice },
});

export type RootState = ReturnType<typeof store.getState>;
