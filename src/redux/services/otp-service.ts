import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@env';
import { api } from './api-service';

export const OTPApi = api.injectEndpoints({
        endpoints: (builder) => ({
                sendOTP: builder.mutation({
                        query: ({ userId }) => {
                                return `/v1/user/send-otp/${userId}`
                        },
                }),
                verifyOTP: builder.mutation({
                        query: ({ userId, otp }) => {
                                return `/v1/user/verify-otp/${userId}/${otp}`
                        }, invalidatesTags: ['user']
                }),
                resetOTP: builder.mutation({
                        query: ({ userId }) => {
                                return `v1/user/reset-otp/${userId}`
                        },
                }),

        }),
        overrideExisting: true,

});

export const { useResetOTPMutation, useSendOTPMutation, useVerifyOTPMutation } = OTPApi;
