import React from "react";
import Backdrop from '@mui/material/Backdrop';
import AddCourse from "../pages/student/AddCourse";
const CourseBackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <AddCourse/>
    </Backdrop>
  );
};

export default CourseBackDrop;
