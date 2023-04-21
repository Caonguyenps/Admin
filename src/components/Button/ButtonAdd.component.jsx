import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ButtonAddComponent(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<AddIcon />}
      onClick={() => {props.handleClick()}}
    >
      {props.title}
    </Button>
  );
}
