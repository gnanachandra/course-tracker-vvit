// Admin Actions : 

// Create - add new platform, add new course to a platform, add new announcement, create new admin
// Read - Get student Details, Get all queries, View all annoucements
// update - update query(mark as resolved)
// delete  - delete platform, delete course


// Features of Admin Dashboard

// 1. Queries can be viewed branchwise 
// 2. List of all students in a tabular format
//      Table Format : S.no RollNo Branch Section Name Email
// Can filter view of students based on Year,Branch,Section,Course
// View list of all queries and when click on individual shows detailed information about the query.
// can type the message and click mark as resolved. 
// can delete a query.


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast, warningToast } from "../../utils/toastHelper";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
    user: user ? JSON.parse(user) : null,
    token: token,
    isLoading: false,
    isLoggedIn : user ? true : false
};


export const adminLogin = createAsyncThunk("api/admin/login(post)",async(payload,{rejectWithValue})=>{
    console.log("Admin Login Payload : ",payload);
    try{
        const response = await axios.post("http://localhost:5000/api/admin/login",payload,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        console.log("Admin login response : ",response.data);
        return response.data;
    }
    catch(error)
    {
        if(!error?.response)
        {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
})


const adminSlice = createSlice({
    name : "admin",
    initialState,
    reducers : {},
    extraReducers : (builder) => {

        builder.addCase(adminLogin.pending,(state)=>{
            state.isLoading = true;
        })

        builder.addCase(adminLogin.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            console.log("Payload : ",payload);
            const user = payload.adminData;
            const token = payload.token;
            console.log("User : ",user);
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token",token);
            state.user = user;
            state.token = token;
            successToast("Login Successful");
        })

        builder.addCase(adminLogin.rejected,(state,{payload})=>{
            state.isLoading = false;
            console.log("Admin Login rejected Payload : ",payload);
            errorToast("Invalid Credentials");
        })

    }
})

export default adminSlice.reducer;