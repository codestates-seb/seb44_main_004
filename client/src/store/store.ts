import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';

export const store = configureStore({
  reducer: { user: userSlice, modal: modalSlice },
});

export type RootState = ReturnType<typeof store.getState>;
