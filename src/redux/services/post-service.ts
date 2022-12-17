import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { api } from './api-service';

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({ offset, limit }) => {
                return `/v1/item/all?offset=${offset}&limit=${limit}`;
            },
            transformResponse: (response) => {
                console.log("response", response);
                return response.items;
            },
        }),
    }),
});

export const { useGetPostsQuery } = postApi;
