import { api } from './api-service';

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserSetting: builder.query({
      query: ({ userId }) => {
        return `/v1/user-setting/${userId}`;
      },
      transformResponse: response => {
        return response.userSetting;
      },
      providesTags: ['user-setting'],
    }),
    getUser: builder.query({
      query: ({ userId }) => {
        return `/v1/users/${userId}`;
      },
      transformResponse: response => {
        return response.user;
      },
      providesTags: ['user'],
    }),
    updateUserSetting: builder.mutation({
      query: ({ userId, update }) => {
        return {
          url: `/v1/user-setting/${userId}}`,
          method: 'PATCH',
          body: update,
        };
      },
      invalidatesTags: ['user-setting'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserSettingQuery,
  useGetUserQuery,
  useUpdateUserSettingMutation,
} = profileApi;
