import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../interfaces';
interface PostState {
  posts: Post[];
  offset: number;
  limit: number;
  filterType: number;
}

const initialState: PostState = {
  posts: [],
  offset: 0,
  limit: 3,
  filterType: 0,
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.offset = action.payload.offset;
      let set = new Set([...state.posts, ...action.payload.posts]);
      let post = [];
      for (let ele of set) post.push(ele);
      state.posts = post;
    },
    updateFilter: (state, action) => {
      state.posts = [];
      state.filterType = action.payload.filterType;
      state.offset = 0;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.offset = 0;
    },
  },
});

export const { updatePosts, updateFilter, resetPosts } = postSlice.actions;

export default postSlice.reducer;
export const selectLimit = (state: any) => state.post.limit;
export const selectOffset = (state: any) => state.post.offset;
export const selectPosts = (state: any) => state.post.posts;
export const selectFilterType = (state: any) => state.post.filterType;
