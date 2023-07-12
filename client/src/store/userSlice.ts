import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  memberId: number;
  nickname: string;
}

const initialState: UserState = {
  memberId: 0,
  nickname: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfoSave: (state, action) => {
      const { memberId, nickname } = action.payload;
      state.memberId = memberId;
      state.nickname = nickname;
    },
    logout: (state) => {
      return state;
    },
  },
});

export const { userInfoSave, logout } = userSlice.actions;

export default userSlice.reducer;
