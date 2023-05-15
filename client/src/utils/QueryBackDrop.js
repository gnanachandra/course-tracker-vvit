import React from "react";
import Backdrop from '@mui/material/Backdrop';
import RaiseQuery from "../pages/student/RaiseQuery";
const QueryBackDrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <RaiseQuery/>
    </Backdrop>
  );
};

export default QueryBackDrop;
