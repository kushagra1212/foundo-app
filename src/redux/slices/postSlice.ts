import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../interfaces';
interface PostState {
  posts: Post[];
  offset: number;
  limit: number;
}

const initialState: PostState = { posts: [], offset: 0, limit: 3 };
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.offset = action.payload.offset;
      state.posts = [...state.posts, ...action.payload.posts]
    },
  },
});

export const { updatePosts } = postSlice.actions;

export default postSlice.reducer;
export const selectOffsetAndLimit = (state: any) => ({ offset: state.post.offset, limit: state.post.limit });
export const selectPosts = (state: any) => (state.post.posts);



