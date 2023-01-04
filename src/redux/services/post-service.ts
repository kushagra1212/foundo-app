import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { api } from './api-service';

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSearchedPosts: builder.mutation({
            query: ({ offset, limit, searchString }) => {
                console.log(offset, limit, searchString)
                return `/v1/item/all-by-search?offset=${offset}&limit=${limit}&searchstring=${searchString}`;
            },
            transformResponse: (response) => {
                return response;
            },
        }),

        getPosts: builder.mutation({
            query: ({ offset, limit, ...rest }) => {
                console.log(offset, limit)
                const restArray = Object.entries(rest);
                let queryString: string = "";
                restArray.forEach(element => {
                    queryString += `&${element[0]}=${element[1]}`;
                });
                console.log(queryString);
                return `/v1/item/all?offset=${offset}&limit=${limit}${queryString}`;
            },
            transformResponse: (response) => {
                return response.items;
            },
        }),
    }),
    overrideExisting: false,

});

export const { useGetPostsMutation, useGetSearchedPostsMutation } = postApi;
