import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { createSlice } from '@reduxjs/toolkit';
import { setItemToLocalStorage } from '../../storage/foundo-localstorage';
const initialState = { posts:null};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    
  },
});

export const {  } = postSlice.actions;

export default postSlice.reducer;
