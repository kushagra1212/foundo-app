import { createSlice } from '@reduxjs/toolkit';
const initialState = { user: null, jwtToken: null };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwtToken } = action.payload;
      state.user = user;
      state.jwtToken = jwtToken;
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
