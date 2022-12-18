import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { api } from './api-service';

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.mutation({
            query: ({ offset, limit }) => {
                console.log(offset, limit)
                return `/v1/item/all?offset=${offset}&limit=${limit}`;
            },
            transformResponse: (response) => {
                return response.items;
            },
        }),
    }),
});

export const { useGetPostsMutation } = postApi;
