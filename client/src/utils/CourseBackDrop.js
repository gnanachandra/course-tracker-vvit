import React from "react";
import Backdrop from '@mui/material/Backdrop';
import RegisterCourse from "../pages/student/RegisterCourse";
const CourseBackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <RegisterCourse/>
    </Backdrop>
  );
};

export default CourseBackDrop;
