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
    }),
    overrideExisting: true,
})

export const {
    useUserLoginMutation
} = authApi