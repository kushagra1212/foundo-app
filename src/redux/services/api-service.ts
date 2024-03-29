import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../configs/key.config';
import { logOut, setCredentials } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  mode: 'no-cors',
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token = getState().auth.jwtToken;

    if (token) {
      headers.set('x-auth-token', `${token}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({}),
  tagTypes: [
    'user',
    'user-setting',
    'Contact-list',
    'Posts',
    'Messages',
    'contact',
    'user-posts',
  ],
});
