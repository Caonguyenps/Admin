import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import PhotoIcon from "@material-ui/icons/Photo";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import "./thumbnail.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const ThumbnailComponent = (props) => {
  const classes = useStyles();
  const [imagePreviews, setImagePreviews] = useState();
  const [imageFile, setImageFile] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.profile) {
      setImagePreviews(props.profile.avatar.url);
    }
  }, [props.profile]);

  const handleChangeImage = (event) => {
    const image = event.target.files[0];
    const urlImage = URL.createObjectURL(image);
    setImageFile(image);
    setImagePreviews(urlImage);
    props.handleChangeImage(urlImage, image);
    setShow(true);
  };

  return (
    <Grid className="wrap-thumbnail">
      <Grid className="thumbnail">
        <Grid className="bg-thumbnail">
          <Grid>
            <Grid className="btn-upload">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className="btn"
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThumbnailComponent;
