import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice";

export default configureStore({
    reducer: {
        auth: authReducer
    },
})