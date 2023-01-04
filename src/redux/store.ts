import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api-service"

import authReducer from "./slices/authSlice"
import postReducer from "./slices/postSlice"
import screenReducer from './slices/sreenSilce'
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        post: postReducer,
        screen: screenReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
})