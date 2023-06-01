import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState: {
        token:localStorage.getItem('token'),
        email:localStorage.getItem('email'),
        userId:localStorage.getItem('userId')
    },
    reducers:{
        login(state,action){
            state.token=action.payload.token;
            state.email=action.payload.email;
            state.userId=action.payload.userId;
            localStorage.setItem('authToken',action.payload.token);
            localStorage.setItem('email',action.payload.email);
            localStorage.setItem('userId',action.payload.userId);
        },
        logout(state){
            state.token=""
            state.email=""
            state.userId=""
            localStorage.removeItem('authToken');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
        },
    }
});

export const authActions=authSlice.actions;
export default authSlice.reducer;
