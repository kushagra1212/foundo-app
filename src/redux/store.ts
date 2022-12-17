import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api-service"

import authReducer from "./slices/authSlice"
import postReducer from "./slices/postSlice"
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        post:postReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: true
})