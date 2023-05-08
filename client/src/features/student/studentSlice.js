import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast } from "../../utils/toastHelper";


const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  courses: [],
  message: "",
  catalog : [],
  showCourseBackDrop : false
};

export const studentLogin = createAsyncThunk("/api/student/login",async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await axios.post('http://localhost:5000/api/student/login', payload,{
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
    const response = await axios.post('http://localhost:5000/api/student/register',payload,{
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

export const getCatalogData = createAsyncThunk("api/student/catalog",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.get("http://localhost:5000/api/student/catalog",{
      headers : {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
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

export const registerCourse = createAsyncThunk("api/student/course",async(payload,{rejectWithValue})=>{
  console.log("register Course : ",payload);
  try{
    const response = await axios.post("http://localhost:5000/api/student/course",payload,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    });
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
});

export const deleteCourse = createAsyncThunk("api/student/course/:id",async(payload,{rejectWithValue})=>{
  console.log("Delete course Payload : ",payload);
  try{
    const response = await axios.delete(`http://localhost:5000/api/student/course/${payload.id}`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
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
});


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
      successToast("Login Successful !");
    });
    builder.addCase(studentLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      console.log(state.message);
      errorToast("Invalid Credentials !");
    });



    builder.addCase(studentRegisteration.pending,(state)=>{
      state.isLoading = true;
      state.message = "processing";
    });
    builder.addCase(studentRegisteration.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.message = payload.message;
      localStorage.setItem("user",JSON.stringify(payload.user));
      localStorage.setItem("token",payload.token);
      successToast("Registeration Successful !");
    });
    builder.addCase(studentRegisteration.rejected,(state,{payload})=>{
      console.log("Student registeration rejected payload : ",payload);
      state.isLoading = false;
      state.message = payload.message;
      errorToast("Check details !");
    });


    builder.addCase(getCatalogData.pending,(state)=>{
      state.isLoading = true;
      state.message = "processing"
    });

    builder.addCase(getCatalogData.fulfilled,(state,{payload})=>{
      state.catalog = payload.data;
      state.isLoading = false;
    })

    builder.addCase(getCatalogData.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("something went wrong")
    })


    builder.addCase(registerCourse.pending,(state)=>{
      state.isLoading = true;
    });

    builder.addCase(registerCourse.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      localStorage.setItem("user",JSON.stringify(payload.data));
      successToast(payload.message);
    });

    builder.addCase(registerCourse.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast(payload.message);
    });


    builder.addCase(deleteCourse.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(deleteCourse.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      successToast("Course Deleted !");
    });

    builder.addCase(deleteCourse.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("Something went wrong !");
    })
  },
});

export default studentSlice.reducer;
