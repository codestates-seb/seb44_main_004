import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  memberId?: number;
  email?: string;
  image?: string;
  nickname?: string;
  introduction?: string | null;
  memberStatus?: string;
  mySubscriber?: number;
  myCuration?: number;
}

const initialState: UserState = {
  memberId: 0,
  email: '',
  image: '',
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
        image,
        nickname,
        introduction,
        memberStatus,
        mySubscriber,
        myCuration,
      } = action.payload;
      state.memberId = memberId;
      state.email = email;
      state.image = image;
      state.nickname = nickname;
      state.introduction = introduction;
      state.image = image;
      state.memberStatus = memberStatus;
      state.mySubscriber = mySubscriber;
      state.myCuration = myCuration;
    },

    logout: (state) => {
      // for(const key in initialState) {
      //   if(typeof state[key] === 'string') state[key] = '';
      //   if(typeof state[key] === 'number') state[key] = 0;
      // }
      return state;
    },
  },
});

export const { saveUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
