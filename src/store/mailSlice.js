import { createSlice } from "@reduxjs/toolkit";

const mailSlice=createSlice({
    name:'mail',
    initialState:{
        inbox:{},
        sent:{},
    },
    reducers:{
        mailSent(state,action){
            state.sent[action.payload.id]=action.payload.mail
        },
        inbox(state,action){
            state.inbox=action.payload
        }
    }
});
export const mailActions=mailSlice.actions;
export default mailSlice.reducer