
import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../../constants/key.config';

import { setItemToLocalStorage } from '../../storage/foundo-localstorage';
const initialState = { user: null, jwtToken: null, forgotPasswordLinkSent: false, jwtResetToken: null };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwtToken, jwtResetToken } = action.payload;
      state.user = user;
      state.jwtToken = jwtToken !== undefined ? jwtToken : "";
      console.log("jwtResetToken", jwtToken);
      if (jwtResetToken) state.jwtResetToken = jwtResetToken;
      setItemToLocalStorage(jwtToken, LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    logOut: (state) => {
      state.user = null;
      state.jwtToken = null;
    },
    setForgotPasswordLinkSent: (state, action) => {
      state.forgotPasswordLinkSent = action.payload.forgotPasswordLinkSent;
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    }
  },

});

export const { setCredentials, logOut, setForgotPasswordLinkSent, updateUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.jwtToken;
export const selectCurrentResetToken = (state: any) => state.auth.jwtResetToken;
export const selectorgotPasswordStatus = (state: any) => state.auth.forgotPasswordLinkSent;
export const selectCurrentUserId = (state: any) => state.auth.user.id;