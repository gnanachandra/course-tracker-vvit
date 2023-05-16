import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorToast, successToast, warningToast } from "../../utils/toastHelper";




const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  courses: [],
  message: "",
  catalog : [],
  course : {},
  activeQueries : [],
  resolvedQueries : [],
  showCourseBackDrop : false,
  showQueryBackDrop : false,
  isLoggedIn : user ? true : false
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

export const registerCourse = createAsyncThunk("api/student/course(post)",async(payload,{rejectWithValue})=>{
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

export const getEnrolledCourses = createAsyncThunk("api/student/course",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.get("http://localhost:5000/api/student/course",{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    return response.data;
  }
  catch(error)
  {
    if(!error?.response){
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const getIndividualCourseDetails = createAsyncThunk("api/student/course/:courseId(get)",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.get(`http://localhost:5000/api/student/course/${payload.id}`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    console.log("Individual Course Details : ",response.data);
    return response.data;
  }
  catch(error)
  {
    if(!error?.response){
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

//adding certificate link 
export const updateCourseDetails = createAsyncThunk("api/student/course/:courseId(patch)",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.patch(`http://localhost:5000/api/student/course/${payload.id}`,payload,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    console.log("Update course response : ",response.data);
    return response.data;
  }
  catch(error)
  {
    if(!error?.response){
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const uploadToCloud = createAsyncThunk("/upload",async(file,{rejectWithValue})=>{
  const formData = new FormData();
  formData.append("photos", file);
  try{
    const response = await axios.post("http://localhost:5000/upload", formData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch(error)
  {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const getStudentProfile = createAsyncThunk("api/student/profile(get)",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.get("http://localhost:5000/api/student/profile",{
      headers:{
        Authorization : `Bearer ${token}`
      }
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

export const updateStudentProfile = createAsyncThunk("/api/student/profile",async(payload,{rejectWithValue})=>{
  console.log("Payload received in slice for update profile : ",payload);
  try{
    const response = await axios.patch("http://localhost:5000/api/student/profile",payload,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    console.log("Response received for update profile : ",response.data);
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

export const raiseQuery = createAsyncThunk("/api/student/query(post)",async(payload,{rejectWithValue})=>{
  console.log("Raise query Payload : ",payload);
  try{
    const response = await axios.post("http://localhost:5000/api/student/queries",payload,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    console.log("Raise query Response : ",response.data);
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

export const getQueries = createAsyncThunk("api/student/queries(get)",async(payload,{rejectWithValue})=>{
  try{
    const response = await axios.get("http://localhost:5000/api/student/queries",{
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    console.log("GetMy queries response : ",response.data);
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

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    logout : (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    cancelAddCourse : (state) => {
      state.showCourseBackDrop = false;
    },

    handleAddCourse : (state) => {
      state.showCourseBackDrop = true;
    },

    handleRaiseQuery : (state) => {
      state.showQueryBackDrop = true;
    },

    cancelRaiseQuery : (state) => {
      state.showQueryBackDrop = false;
    }

  },

  extraReducers: (builder) => {

    //login
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
      state.isLoggedIn = true;
      successToast("Login Successful !");
    });
    builder.addCase(studentLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      console.log(state.message);
      errorToast("Invalid Credentials !");
    });


    //student registeration
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



    //getting catalog data
    builder.addCase(getCatalogData.pending,(state)=>{
      state.isLoading = true;
      state.message = "processing"
    });

    builder.addCase(getCatalogData.fulfilled,(state,{payload})=>{
      state.catalog = payload.data;
      console.log(payload.data);
      state.isLoading = false;
    })

    builder.addCase(getCatalogData.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("something went wrong")
    })


    //getting enrolled courses
    builder.addCase(getEnrolledCourses.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(getEnrolledCourses.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.courses = payload.data;
      // console.log(state.courses);
      successToast("Enrolled Courses fetched !");
    })

    builder.addCase(getEnrolledCourses.rejected,(state,{payload})=>{
      console.log(payload);
      state.isLoading = false;
      errorToast(payload.message);
    })

    builder.addCase(getIndividualCourseDetails.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(getIndividualCourseDetails.fulfilled,(state,payload)=>{
      state.isLoading = false;
      state.course = payload.data;
      successToast("Individual course Details Fetched !");
    })

    builder.addCase(getIndividualCourseDetails.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("Something went wrong !");
    })


    //registering into course
    builder.addCase(registerCourse.pending,(state)=>{
      state.isLoading = true;
      state.message = "registering in course"
    });

    builder.addCase(registerCourse.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.showCourseBackDrop = false;
      localStorage.setItem("user",JSON.stringify(payload.data));
      successToast(payload.message);
    });

    builder.addCase(registerCourse.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast(payload.message);
    });

    builder.addCase(updateCourseDetails.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(updateCourseDetails.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      console.log("update course success payload : ",payload);
      successToast("Certificate Link Added !");
    })

    builder.addCase(updateCourseDetails.rejected,(state,{payload})=>{
      state.isLoading = false;
      console.log("Update Course Rejected payload : ",payload);
      errorToast("Something went wrong !")
    })


    //deleting a course
    builder.addCase(deleteCourse.pending,(state)=>{
      state.isLoading = true;
      warningToast("Course is being deleted")
    })

    builder.addCase(deleteCourse.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      successToast("Course Deleted !");
      window.location.reload();
    });

    builder.addCase(deleteCourse.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("Something went wrong !");
    })

    //uploading the photos of students to cloud
    builder.addCase(uploadToCloud.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(uploadToCloud.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      console.log(payload);
      successToast("File uploaded");
    })

    builder.addCase(uploadToCloud.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast("Something went wrong");
    })


    //updating student profile
    builder.addCase(updateStudentProfile.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(updateStudentProfile.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      successToast(payload.message);
      localStorage.setItem("user",JSON.stringify(payload.updatedData));
      window.location.reload();
    })

    builder.addCase(updateStudentProfile.rejected,(state,{payload})=>{
      state.isLoading = false;
      errorToast(payload.message);
    })

    builder.addCase(raiseQuery.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(raiseQuery.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.showQueryBackDrop = false;
      console.log("Raise query fulfilled payload : ",payload);
      successToast("Query Raised !");
    })

    builder.addCase(raiseQuery.rejected,(state,{payload})=>{
      state.isLoading = false;
      console.log("Raise query rejected paylaod : ",payload);
      errorToast("Something went wrong !");
    })

    builder.addCase(getQueries.pending,(state)=>{
      state.isLoading = true;
    })

    builder.addCase(getQueries.fulfilled,(state,{payload})=>{
      state.isLoading = false;
      state.activeQueries = payload.activeQueries;
      state.resolvedQueries = payload.resolvedQueries;
      console.log("Fullfilled get my queries payload : ",payload);
    })

    builder.addCase(getQueries.rejected,(state,{payload})=>{
      state.isLoading = false;
      console.log("Get my queries rejected payload : ",payload);
    })
  },
});
export const {logout,cancelAddCourse,handleAddCourse,cancelEditCourse,handleRaiseQuery,cancelRaiseQuery} = studentSlice.actions
export default studentSlice.reducer;
