import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';

export const store = configureStore({
  reducer: { counter: counterSlice },
});

export type RootState = ReturnType<typeof store.getState>;
