import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@env";
import { getTokenFromLocalStorage, removeItemFromLocalStroage } from "../../storage/foundo-localstorage";
import { setCredentials } from "../slices/authSlice";
import { api } from "./api-service"

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
        userSignup:builder.mutation({
            query:credentials=>{
                return ({
                    url:'/v1/user/signup',
                    method:'POST',
                    body:{...credentials}
                })
            }
        }),
        userForgotPassword:builder.mutation({
            query:({email})=>`/v1/app-auth/forgot-password/${email}`
        }),
        userVerifyResetPassword:builder.query({
            query:({email,token})=>{
                return `/v1/app-auth/verify-token/${email}/${token}`
            },transformResponse:(response)=>{
                console.log(response)
                if(response?.id)
                return true;
                else return false;
            }
        }),
        userResetPassword:builder.mutation({query:({email,token,password})=>{
            return ({
                url:`/v1/app-auth/reset-password/${email}/${token}`,
                method:'POST',
                body:{password:password}
            })
        }})
    }),
    overrideExisting: true,
})
export const userLoggedIn=async()=>{
    const res=await getTokenFromLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    if(res) return true;
    return false;
}
export const logoutUser=()=>{
    removeItemFromLocalStroage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}
export const {
    useUserLoginMutation,
    useUserSignupMutation,
    useUserForgotPasswordMutation,
    useUserVerifyResetPasswordQuery,useUserResetPasswordMutation
} = authApi