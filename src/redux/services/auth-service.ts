import { BASE_URL, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@env";
import { getTokenFromLocalStorage, removeItemFromLocalStroage } from "../../storage/foundo-localstorage";
import { setCredentials } from "../slices/authSlice";
import { api } from "./api-service"
type Response = {
    data: any;
}
export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        userLogin: builder.mutation({
            query: credentials => {
                return ({
                    url: '/v1/user/signin',
                    method: 'POST',
                    body: { ...credentials }
                })
            }
        }),
        userSignup: builder.mutation({
            query: credentials => {
                return ({
                    url: '/v1/user/signup',
                    method: 'POST',
                    body: { ...credentials }
                })
            }
        }),
        userForgotPassword: builder.mutation({
            query: ({ email }) => `/v1/app-auth/forgot-password/${email}`
        }),
        userVerifyResetPassword: builder.query({
            query: ({ email, token }) => {
                return `/v1/app-auth/verify-reset-password-token/${email}/${token}`
            }, transformResponse: (response) => {
                console.log(response, "Verify Token")
                if (response?.id)
                    return { userCredentials: response };
                else return { userCredentials: null };
            }
        }),
        userResetPassword: builder.mutation({
            query: ({ email, token, password }) => {
                return ({
                    url: `/v1/app-auth/reset-password/${email}/${token}`,
                    method: 'POST',
                    body: { password: password }
                })
            }
        }),
        userUpdate: builder.mutation({
            query: (update) => {
                return ({
                    url: `v1/user/update`,
                    method: 'PATCH',
                    body: update
                })
            }
        }),
    }),
    overrideExisting: true,
})
export const userLoggedIn = async () => {
    const token = await getTokenFromLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    if (!token) return { isLoggedIn: false };
    try {
        const res = await fetch(`${BASE_URL}/v1/app-auth/verify-token/${token}`);
        const resJson = await res.json();
        if (resJson?.error) return { isLoggedIn: false }
        return { ...resJson, isLoggedIn: true, token };
    } catch (err) {
        console.log(err, "Handle: UserLoggedIn ");
        return { isLoggedIn: false };;
    }
}
export const logoutUser = () => {
    removeItemFromLocalStroage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}
export const {
    useUserLoginMutation,
    useUserSignupMutation,
    useUserForgotPasswordMutation,
    useUserVerifyResetPasswordQuery, useUserResetPasswordMutation,
    useUserUpdateMutation
} = authApi