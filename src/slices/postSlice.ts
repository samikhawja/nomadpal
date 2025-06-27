import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  userId: string;
  type: 'question' | 'offer' | 'review' | 'request';
  title: string;
  content: string;
  location: string;
  tags: string[];
  createdAt: string;
  replies: any[];
  upvotes: number;
  downvotes: number;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<Post>) {
      const idx = state.posts.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    addReply(state, action: PayloadAction<{ postId: string; reply: any }>) {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) post.replies.push(action.payload.reply);
    },
  },
});

export const { setPosts, addPost, updatePost, addReply } = postSlice.actions;
export default postSlice.reducer; 