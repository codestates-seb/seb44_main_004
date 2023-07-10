import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';
import modalSlice from './modalSlice';

export const store = configureStore({
  reducer: { counter: counterSlice, 
    modal:modalSlice },
});

export type RootState = ReturnType<typeof store.getState>;
