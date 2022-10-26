import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@env';
import { logOut, setCredentials } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }:{getState:any}) => {
    const token = getState().auth.jwtToken;
    if (token) {
      headers.set('x-auth-token', `${token}`);
    }
    headers.set('Content-Type','application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
  let result:any = await baseQuery(args, api, extraOptions);
 console.log(result);
  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api= createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
