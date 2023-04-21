import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function InputComponent(props) {
  return (
    <TextField
      id="outlined-basic"
      label={props.title}
      variant="outlined"
      style={{ background: "white !important", width: "100%" }}
      defaultValue={props.defaultValue}
      key={props.defaultValue}
      onChange={(e) => {props.handleChangeInput(e)}}
    />
  );
}
