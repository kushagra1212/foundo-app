import { AddPost } from '../../interfaces';
import { api } from './api-service';

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    getSearchedPosts: builder.mutation({
      query: ({ offset, limit, searchString }) => {
        return `/v1/posts/search?offset=${offset}&limit=${limit}&searchstring=${searchString}`;
      },
      transformResponse: response => {
        return response;
      },
    }),

    getPosts: builder.query({
      query: ({ offset, limit, ...rest }) => {
        const restArray = Object.entries(rest);
        let queryString: string = '';
        restArray.forEach(element => {
          queryString += `&${element[0]}=${element[1]}`;
        });

        return `/v1/posts?offset=${offset}&limit=${limit}${queryString}`;
      },
      transformResponse: response => {
        return response.items;
      },
      providesTags: ['Posts'],
    }),
    getUserPosts: builder.query({
      query: ({ offset, limit, userId, ...rest }) => {
        const restArray = Object.entries(rest);
        let queryString: string = '';
        restArray.forEach(element => {
          queryString += `&${element[0]}=${element[1]}`;
        });
        return `/v1/posts/user/${userId}?offset=${offset}&limit=${limit}${queryString}`;
      },
      transformResponse: response => {
        return response.items;
      },
      providesTags: ['Posts'],
    }),
    getpost: builder.query({
      query: id => {
        return `/v1/posts/${id}`;
      },
      transformResponse: response => {
        return response.item;
      },
    }),
    addItemPost: builder.mutation({
      query: (body: AddPost) => {
        return {
          url: `/v1/posts`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Posts'],
    }),
    getMatches: builder.query({
      query: itemId => {
        return `/v1/posts/matches/${itemId}`;
      },
      transformResponse: response => {
        return response.matches;
      },
      providesTags: ['Posts'],
    }),
    getPostsByPostIds: builder.query({
      query: body => {
        return {
          url: `/v1/posts/post-ids`,
          method: 'POST',
          body,
        };
      },
      transformResponse: response => {
        return response;
      },
      providesTags: ['Posts'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetPostsQuery,
  useLazyGetUserPostsQuery,
  useGetPostsByPostIdsQuery,
  useLazyGetPostsByPostIdsQuery,
  useGetSearchedPostsMutation,
  useGetpostQuery,
  useGetUserPostsQuery,
  useGetMatchesQuery,
  useAddItemPostMutation,
} = postApi;
