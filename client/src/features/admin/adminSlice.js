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