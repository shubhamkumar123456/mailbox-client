import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import mailSlice from "./mailSlice";

const store=configureStore({
    reducer:{
        auth:AuthSlice,
        mail:mailSlice
    }
})

export default store