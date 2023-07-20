import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Reply {
  replyId: number;
  memberId: number;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
interface RepliesState {
  replies: Reply[];
}
const initialState: RepliesState = {
  replies: [],
};

export const repliesSlice = createSlice({
  name: 'replies',
  initialState,
  reducers: {
    saveReplies: (state, action: PayloadAction<Reply[]>) => {
      state.replies = action.payload;
    },
    addReply: (state, action: PayloadAction<Reply>) => {
      state.replies.push(action.payload);
    },
    updateReply: (state, action: PayloadAction<Reply>) => {
      const { replyId, content } = action.payload;
      const reply = state.replies.find((r) => r.replyId === replyId);
      if (reply) {
        reply.content = content;
        reply.updatedAt = new Date().toISOString();
      }
    },
    deleteReply: (state, action: PayloadAction<number>) => {
      const replyId = action.payload;
      state.replies = state.replies.filter((r) => r.replyId !== replyId);
    },
  },
});

export const { saveReplies, addReply, updateReply, deleteReply } = repliesSlice.actions;

export default repliesSlice.reducer;
