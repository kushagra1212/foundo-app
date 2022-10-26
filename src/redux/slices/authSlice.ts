import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { createSlice } from '@reduxjs/toolkit';
import { setItemToLocalStorage } from '../../storage/foundo-localstorage';
const initialState = { user: null, jwtToken: null };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwtToken } = action.payload;
      state.user = user;
      state.jwtToken = jwtToken;
      setItemToLocalStorage(jwtToken,LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    logOut: (state) => {
      state.user = null;
      state.jwtToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.jwtToken;
