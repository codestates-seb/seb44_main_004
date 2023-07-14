import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  memberId?: number;
  email?: string;
  nickname?: string;
  introduction?: string;
  memberStatus?: string;
}

const initialState: UserState = {
  memberId: 0,
  email: '',
  nickname: '',
  introduction: '',
  memberStatus: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      const { memberId, email, nickname, introduction, memberStatus } = action.payload;
      state.memberId = memberId;
      state.email = email;
      state.nickname = nickname;
      state.introduction = introduction;
      state.memberStatus = memberStatus;
    },
    logout: (state) => {
      return state;
    },
  },
});

export const { saveUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
