import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  memberId: number;
  email: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  memberStatus: string;
  mySubscriber: number;
  myCuration: number;
}

const initialState: UserState = {
  memberId: 0,
  email: '',
  nickname: '',
  introduction: '',
  image: null,
  memberStatus: '',
  mySubscriber: 0,
  myCuration: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      const {
        memberId,
        email,
        nickname,
        introduction,
        image,
        memberStatus,
        mySubscriber,
        myCuration,
      } = action.payload;
      state.memberId = memberId;
      state.email = email;
      state.nickname = nickname;
      state.introduction = introduction;
      state.image = image;
      state.memberStatus = memberStatus;
      state.mySubscriber = mySubscriber;
      state.myCuration = myCuration;
    },

    logout: (state) => {
      return state;
    },
  },
});

export const { saveUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
