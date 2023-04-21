import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ButtonSaveComponent(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      className={classes.button}
      startIcon={<SaveIcon />}
      onClick={props.handleClick}
    >
      Update
    </Button>
  );
}
