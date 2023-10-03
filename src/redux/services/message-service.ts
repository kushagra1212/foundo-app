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
        return { messages, offset: arg.offset };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.offset > 0) {
          currentCache.messages.push(...newItems.messages);
          return currentCache;
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result, error, args) => {
        if (!result) return ['Messages'];
        return result.messages.map(message => ({
          type: 'Messages',
          id: message.id,
        }));
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
      invalidatesTags: ['Contact-list', 'Messages'],
    }),
    sendMessage: builder.mutation({
      query: body => {
        return {
          url: '/v1/messages/',
          method: 'POST',
          body,
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
  }),
  overrideExisting: true,
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetContactListQuery,
  useSendContacMessageMutation,
} = messageApi;
