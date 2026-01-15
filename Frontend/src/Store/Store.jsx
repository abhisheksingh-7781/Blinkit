import {configureStore} from "@reduxjs/toolkit"
import userReducer from './Reducers/userSlice'
export const store = configureStore({
    reducer : {
        user : userReducer
    },
})

