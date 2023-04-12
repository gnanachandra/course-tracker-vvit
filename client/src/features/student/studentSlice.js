import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    user : user ? JSON.parse(user) : null,
    token : token,
    isLoading : false,
    courses : []
}

export const studentLogin = createAsyncThunk("/api/student/login",async(payload,{rejectWithValue})=>{
    console.log(payload);
})

