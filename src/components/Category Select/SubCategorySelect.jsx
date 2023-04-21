import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function SubCategorySelect(props) {
  console.log(props);
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState({
    subCategoryName: props?.value?.subCategoryName,
    _id: props?.value?._id,
  });

  const handeChange = (event, value) => {
    if (value) {
      props.handleChange(value);
    } else {
      props.handleChange("");
    }
  };
  useEffect(() => {
    if (props.value && props.data) {
      for (let item of props.data) {
        console.log("item", item)
        if (props.value.categoryID === item._id) {
          setDefaultValue({
            subCategoryName: item.subCategoryName,
            _id: item._id,
          });
        }
      }
    }
  }, [props.value, props.data]);

  console.log(defaultValue);

  return (
    <Autocomplete
      id="country-select-demo"
      autoComplete={false}
      style={{ width: "100%", backgroundColor: "white" }}
      options={props?.data}
      defaultValue={defaultValue}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.subCategoryName || option.name}
      renderOption={(option) => (
        <React.Fragment>{option.subCategoryName || option.name}</React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          defaultValue={defaultValue.subCategoryName || defaultValue.name || defaultValue._id}
          label="Select Sub Category"
        />
      )}
      onChange={handeChange}
    />
  );
}
