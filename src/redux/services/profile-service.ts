import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { api } from './api-service';

export const profileApi = api.injectEndpoints({
        endpoints: (builder) => ({
                getUserSetting: builder.query({
                        query: ({ userId }) => {
                                return `/v1/user-setting/${userId}`
                        }, transformResponse: (response) => {
                                return response;
                        }
                }),
                getUser: builder.query(({
                        query: ({ userId }) => {
                                return `/v1/user/${userId}`
                        }, transformResponse: (response) => {

                                return response.user;
                        },
                        providesTags: ['user']
                }))
        }),
        overrideExisting: true,

});

export const { useGetUserSettingQuery, useGetUserQuery } = profileApi;
