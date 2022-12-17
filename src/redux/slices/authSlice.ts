import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { createSlice } from '@reduxjs/toolkit';
import { setItemToLocalStorage } from '../../storage/foundo-localstorage';
const initialState = { user: null, jwtToken: null ,forgotPasswordLinkSent:false,jwtResetToken:null};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, jwtToken ,jwtResetToken} = action.payload;
      state.user = user;
      state.jwtToken = jwtToken!==undefined?jwtToken:"";
      if(jwtResetToken) state.jwtResetToken=jwtResetToken;
      setItemToLocalStorage(jwtToken,LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    logOut: (state) => {
      state.user = null;
      state.jwtToken = null;
    },
    setForgotPasswordLinkSent:(state,action)=>{
      state.forgotPasswordLinkSent=action.payload.forgotPasswordLinkSent;
    }
  },
});

export const { setCredentials, logOut,setForgotPasswordLinkSent } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.jwtToken;
export const selectCurrentResetToken= (state: any) => state.auth.jwtResetToken;
export const selectorgotPasswordStatus=(state:any)=>state.auth.forgotPasswordLinkSent;