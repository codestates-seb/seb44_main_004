import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  memberId: number;
}

const initialState: UserState = {
  memberId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      return state;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
