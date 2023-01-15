import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
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
                        query: (body) => ({
                                url: '/v1/message/add',
                                method: 'POST',
                                body: body,
                        }),
                }),
                getContacts: builder.mutation({
                        query: ({ userId, limit, offset }) => ({
                                url: `/v1/message/contact-list?userId=${userId}&limit=${limit}&offset=${offset}`,
                                method: 'GET',

                        }),
                }),

        }),
        overrideExisting: true,

});

export const { useGetContactsMutation, useGetMessagesMutation, useSendMessageMutation } = messageApi;
