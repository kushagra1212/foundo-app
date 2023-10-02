import { api } from './api-service';

export const messageApi = api.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: ({ senderId, receiverId, limit, offset }) => ({
        url: `/v1/messages/${senderId}/${receiverId}/${limit}/${offset}`,
        method: 'GET',
      }),
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: body => {
        return {
          url: '/v1/messages/contact',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Contacts', 'Messages'],
    }),
    getContacts: builder.query({
      query: ({ userId, limit, offset }) => ({
        url: `/v1/messages/contact-list/${userId}/${limit}/${offset}`,
        method: 'GET',
      }),
      providesTags: ['Contacts'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useLazyGetContactsQuery,
} = messageApi;
