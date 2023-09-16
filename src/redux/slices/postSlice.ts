import { createSlice } from '@reduxjs/toolkit';

import { Post } from '../../interfaces';
interface PostState {
  posts: Post[];
  userPosts: Post[];
  userPostsOffset: number;
  userPostsLimit: number;
  userPostsFilterType: number;
  offset: number;
  limit: number;
  filterType: number;
}

const initialState: PostState = {
  posts: [],
  offset: 0,
  limit: 3,
  filterType: 0,
  userPosts: [],
  userPostsOffset: 0,
  userPostsLimit: 3,
  userPostsFilterType: 0,
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePosts: (state, action) => {
      state.offset = action.payload.offset;
      const set = new Set([...state.posts, ...action.payload.posts]);
      const post = [];
      for (const ele of set) post.push(ele);
      state.posts = post;
    },
    updateFilter: (state, action) => {
      state.posts = [];
      state.filterType = action.payload.filterType;
      state.offset = 0;
    },
    resetPosts: state => {
      state.posts = [];
      state.offset = 0;
    },
    updateUserPosts: (state, action) => {
      state.userPostsOffset = action.payload.offset;
      state.userPosts = [...state.userPosts, ...action.payload.posts];
    },
    updateUsersPostsFilter: (state, action) => {
      state.userPosts = [];
      state.userPostsFilterType = action.payload.filterType;
      state.userPostsOffset = 0;
    },
    resetUserPosts: state => {
      state.userPosts = [];
      state.userPostsOffset = 0;
    },
  },
});

export const {
  updatePosts,
  updateFilter,
  resetPosts,
  updateUserPosts,
  updateUsersPostsFilter,
  resetUserPosts,
} = postSlice.actions;

export default postSlice.reducer;
export const selectLimit = (state: any) => state.post.limit;
export const selectOffset = (state: any) => state.post.offset;
export const selectPosts = (state: any) => state.post.posts;
export const selectFilterType = (state: any) => state.post.filterType;

// User Posts Selectors

export const selectUserPostsLimit = (state: any) => state.post.userPostsLimit;
export const selectUserPostsOffset = (state: any) => state.post.userPostsOffset;
export const selectUserPosts = (state: any) => state.post.userPosts;
export const selectUserPostsFilterType = (state: any) =>
  state.post.userPostsFilterType;
