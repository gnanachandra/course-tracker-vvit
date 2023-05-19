import {configureStore} from "@reduxjs/toolkit";
import studentReducer from "./features/student/studentSlice.js"
import adminReducer from "./features/admin/adminSlice.js"   
const store = configureStore({
    reducer : {
        student : studentReducer,
        admin : adminReducer
    }
});

export default store;