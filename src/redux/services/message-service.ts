import { ChatMessage } from '../../interfaces';
import { contactType } from '../../screens/contactScreens/ContactScreen';
import { api } from './api-service';
export const messageApi = api.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: ({ senderId, receiverId, limit, offset }) => ({
        url: `/v1/messages/${senderId}/${receiverId}/${limit}/${offset}`,
        method: 'GET',
      }),
      transformResponse(messages: ChatMessage[], meta, arg) {
        return messages;
      },
    }),
    sendContacMessage: builder.mutation({
      query: body => {
        return {
          url: '/v1/messages/contact',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Contact-list'],
    }),
    sendMessage: builder.mutation<any, any>({
      query: ({
        fk_senderId,
        fk_receiverId,
        message,
      }: {
        fk_senderId: number;
        fk_receiverId: number;
        message: string;
      }) => {
        return {
          url: '/v1/messages/',
          method: 'POST',
          body: {
            fk_senderId,
            fk_receiverId,
            message,
          },
        };
      },
    }),
    getContactList: builder.query({
      query: ({ userId, limit, offset }) => ({
        url: `/v1/messages/contact-list/${userId}/${limit}/${offset}`,
        method: 'GET',
      }), // Only have one cache entry because the arg always maps to one string
      transformResponse(contacts: contactType[], meta, arg) {
        return { contacts, offset: arg.offset };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (newItems.offset > 0) {
          currentCache.contacts.push(...newItems.contacts);
          return currentCache;
        }
        return newItems;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['Contact-list'],
    }),
    getIsAContact: builder.query({
      query: ({ currentUserId, IdOfUserWhoPosted }) => ({
        url: `/v1/messages/${currentUserId}/contact/${IdOfUserWhoPosted}`,
        method: 'GET',
      }),
      transformResponse(data: { contact: contactType }) {
        return data.contact;
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetContactListQuery,
  useSendContacMessageMutation,
  useLazyGetIsAContactQuery,
  useLazyGetMessagesQuery,
} = messageApi;
