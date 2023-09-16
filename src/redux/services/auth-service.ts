import {
  BASE_URL,
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
} from '../../constants/key.config.js';
import {
  getTokenFromLocalStorage,
  removeItemFromLocalStroage,
} from '../../storage/foundo-localstorage';
import { api } from './api-service';

type Response = {
  data: any;
};
export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    userLogin: builder.mutation({
      query: credentials => {
        return {
          url: '/v1/user/signin',
          method: 'POST',
          body: { ...credentials },
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    userSignup: builder.mutation({
      query: credentials => {
        return {
          url: '/v1/user/signup',
          method: 'POST',
          body: { ...credentials },
        };
      },
    }),
    userForgotPassword: builder.mutation({
      query: ({ email }) => `/v1/app-auth/forgot-password/${email}`,
    }),
    userVerifyResetPassword: builder.query({
      query: ({ email, token }) => {
        return `/v1/app-auth/verify-reset-password-token/${email}/${token}`;
      },
      transformResponse: response => {
        if (response?.id) return { userCredentials: response };
        else return { userCredentials: null };
      },
    }),
    userResetPassword: builder.mutation({
      query: ({ email, token, password }) => {
        return {
          url: `/v1/app-auth/reset-password/${email}/${token}`,
          method: 'POST',
          body: { password },
        };
      },
    }),
    userUpdate: builder.mutation({
      query: update => {
        return {
          url: `v1/user/update`,
          method: 'PATCH',
          body: update,
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
  overrideExisting: true,
});
export const userLoggedIn = () => {
  return new Promise(async (resolve, reject) => {
    const token = await getTokenFromLocalStorage(
      LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    );
    if (!token) return resolve({ isLoggedIn: false });
    try {
      const res = await fetch(`${BASE_URL}/v1/app-auth/verify-token/${token}`);
      const resJson = await res.json();
      if (resJson?.error) resolve({ isLoggedIn: false });
      resolve({ ...resJson, isLoggedIn: true, token });
    } catch (err) {
      resolve(
        new Error('Something went wrong while trying to verify your token'),
      );
    }
  });
};
export const logoutUser = () => {
  removeItemFromLocalStroage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};
export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useUserForgotPasswordMutation,
  useUserVerifyResetPasswordQuery,
  useUserResetPasswordMutation,
  useUserUpdateMutation,
} = authApi;
