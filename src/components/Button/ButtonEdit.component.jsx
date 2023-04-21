import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export default function ButtonEditComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="delete"
        style={{ color: "blue" }}
        onClick={props.handleClick}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
}
