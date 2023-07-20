import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';
import repliesSlice from './repliesSlice';

export const store = configureStore({
  reducer: { user: userSlice, modal: modalSlice, replies: repliesSlice },
});

export type RootState = ReturnType<typeof store.getState>;
