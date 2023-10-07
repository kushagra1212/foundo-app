import { User } from '../../interfaces';
import { api } from './api-service';

export const profileApi = api.injectEndpoints({
  endpoints: builder => ({
    getUserSetting: builder.query({
      query: ({ fk_userId }) => {
        return `/v1/user-setting/${fk_userId}`;
      },
      transformResponse: response => {
        return response.userSetting;
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'user-setting', id: arg.fk_userId }];
      },
    }),
    getUser: builder.query({
      query: ({ fk_userId }) => {
        return `/v1/users/${fk_userId}`;
      },
      transformResponse: response => {
        return response.user as User;
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'user', id: arg.fk_userId }];
      },
    }),
    updateUserSetting: builder.mutation({
      query: ({ fk_userId, update }) => {
        return {
          url: `/v1/user-setting/${fk_userId}`,
          method: 'PATCH',
          body: update,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [
          { type: 'user-setting', id: arg.fk_userId },
          { type: 'user', id: arg.fk_userId },
        ];
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserSettingQuery,
  useGetUserQuery,
  useUpdateUserSettingMutation,
} = profileApi;
