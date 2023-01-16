import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { AddPost } from '../../interfaces';
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

        getPosts: builder.query({
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
            providesTags: ['Posts'],
        }),
        getpost: builder.query({
            query: (id) => {
                return `/v1/item/${id}`;
            },
            transformResponse: (response) => {
                return response.item;
            }
        }),
        addLostItemPost: builder.mutation({
            query: (body: AddPost) => {
                return ({
                    url: '/v1/item/add-lost',
                    method: 'POST',
                    body: body,
                })
            },
            invalidatesTags: ['Posts'],
        }),

    }),
    overrideExisting: true,
});

export const { useLazyGetPostsQuery, useGetSearchedPostsMutation, useGetpostQuery, useAddLostItemPostMutation } = postApi;
