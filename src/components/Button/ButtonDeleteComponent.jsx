import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export default function ButtonDeleteComponent(props) {
  const classes = useStyles();
  const handleClick = () => {
   props.handleClick()
  }
  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" style={{ color: "red" }} onClick={() => {handleClick()}}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
