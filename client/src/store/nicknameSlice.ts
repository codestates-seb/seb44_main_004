import { createSlice } from '@reduxjs/toolkit';
export interface NicknameState {
  usernickname: string;
}
const initialNicknameState: NicknameState = {
  usernickname: '',
};

export const nickanameSlice = createSlice({
  name: 'userNickname',
  initialState: initialNicknameState,
  reducers: {
    saveUserNickname: (state, action) => {
      const nickname = action.payload;
      state.usernickname = nickname;
    },
  },
});
export const { saveUserNickname } = nickanameSlice.actions;
export default nickanameSlice.reducer;
