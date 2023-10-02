import { api } from './api-service';

export const OTPApi = api.injectEndpoints({
  endpoints: builder => ({
    sendOTP: builder.mutation({
      query: ({ userId }) => {
        return `/v1/users/send-otp/${userId}`;
      },
    }),
    verifyOTP: builder.mutation({
      query: ({ userId, otp }) => {
        return `/v1/users/verify-otp/${userId}/${otp}`;
      },
      invalidatesTags: ['user'],
    }),
    resetOTP: builder.mutation({
      query: ({ userId }) => {
        return `/v1/users/reset-otp/${userId}`;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useResetOTPMutation, useSendOTPMutation, useVerifyOTPMutation } =
  OTPApi;
