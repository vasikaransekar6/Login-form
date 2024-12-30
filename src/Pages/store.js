import { configureStore } from "@reduxjs/toolkit";
import { userslice } from "./Thunkslice";


export const store=configureStore({
    reducer:{
        users:userslice.reducer
    }
}) 