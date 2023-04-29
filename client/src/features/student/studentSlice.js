import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  courses: [],
  message: "",
};

export const studentLogin = createAsyncThunk(
  "/api/student/login",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post('https://course-tracker-vvit.vercel.app/api/student/login', payload,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const studentRegisteration = createAsyncThunk("/api/student/register",async(payload,{rejectWithValue})=>{
  console.log("Payload for registeration : ",payload);
  try{
    const response = await axios.post('https://course-tracker-vvit.vercel.app/api/student/register',payload,{
      headers : {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    console.log("Registeration response : ",response);
    return response.data;
  }catch(error)
  {
    console.log("Registeration error : ",error);
    if(!error?.response)
    {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(studentLogin.pending, (state) => {
      state.isLoading = true;
      state.message = "processing";
    });
    builder.addCase(studentLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { message, token, data } = payload;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      state.token = token;
      state.user = data;
      state.message = message;
      console.log(state.message);
    });
    builder.addCase(studentLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      console.log(state.message);
    });

    builder.addCase(studentRegisteration.pending,(state)=>{
      state.isLoading = true;
      state.message = "processing";
    });
    builder.addCase(studentRegisteration.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.message = payload.message;
      // localStorage.setItem("user",JSON.stringify(payload.user));
      // localStorage.setItem("token",token);
    })
    builder.addCase(studentRegisteration.rejected,(state,{payload})=>{
      console.log("Student registeration rejected payload : ",payload);
      state.isLoading = false;
      state.message = payload.message;
    })
  },
});
export default studentSlice.reducer;
