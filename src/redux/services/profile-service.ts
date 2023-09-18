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
        return `/v1/user/${userId}`;
      },
      transformResponse: response => {
        return response.user;
      },
      providesTags: ['user'],
    }),
    updateUserSetting: builder.mutation({
      query: update => {
        return {
          url: `v1/user-setting/update`,
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
