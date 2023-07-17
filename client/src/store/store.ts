import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import modalSlice from './modalSlice';
import nickanameSlice from './nicknameSlice';
export const store = configureStore({
  reducer: { user: userSlice, modal: modalSlice, nickanme: nickanameSlice },
});

export type RootState = ReturnType<typeof store.getState>;
