import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export default function ButtonAddNew(props) {
  const classes = useStyles();
  const handleClick = () => {
   props.handleClick()
  }
  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" style={{ color: "green" }} onClick={() => {handleClick()}}>
        <AddBoxIcon />
      </IconButton>
    </div>
  );
}
