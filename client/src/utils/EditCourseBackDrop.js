import React from "react";
import Backdrop from '@mui/material/Backdrop';
import EditCourse from "../pages/student/EditCourse";
const CourseBackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <EditCourse/>
    </Backdrop>
  );
};

export default CourseBackDrop;
