import { api } from './api-service';

export const messageApi = api.injectEndpoints({

        endpoints: builder => ({
                getMessages: builder.mutation({
                        query: ({ senderId, receiverId, limit, offset }) => ({
                                url: '/v1/message/messages?senderId=' + senderId + '&receiverId=' + receiverId + '&limit=' + limit + '&offset=' + offset,
                                method: 'GET',
                        }),
                }),
                sendMessage: builder.mutation({
                        query: (body) => {
                                return ({
                                        url: '/v1/message/add',
                                        method: 'POST',
                                        body: body,
                                })
                        },
                        invalidatesTags: ['Contacts'],
                }),
                getContacts: builder.query({
                        query: ({ userId, limit, offset }) => ({
                                url: `/v1/message/contact-list?userId=${userId}&limit=${limit}&offset=${offset}`,
                                method: 'GET',
                        }),
                        providesTags: ['Contacts'],

                }),

        }),
        overrideExisting: true,

});

export const { useGetMessagesMutation, useSendMessageMutation, useLazyGetContactsQuery } = messageApi;
