import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
    name: "Auth",
    initialState: {
        userAddress: null,
        userRole: null
    },

    reducers: {
        setUserRole: (state, action) => {
            state.userRole = action.payload
            console.log("user role set");
        }
    }
})

export const { setUserRole } = AuthSlice.actions;
export default AuthSlice.reducer;