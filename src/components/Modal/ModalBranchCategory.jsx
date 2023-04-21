import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getCategoryProduct } from "../../api/category.api";
import SelectCategory from "../Category Select/CategorySelect.component";
import { addCategoryBranch } from "../../api/admin.api";
export default function ModalBranchCategory(props) {
  const [arrCate, setArrCate] = useState([]);
  const [defaultData, setDefaultData] = useState();
  const [valueUpdate, setValueUpdate] = useState();
  useEffect(async () => {
    if (props.data) {
      await getCategoryProduct().then((res) => {
        setArrCate(res.data);
        if (props.data.listsCategory !== 0) {
          for (let item of res.data) {
            if (item._id == props.data.listsCategory[0].categoryID) {
              setDefaultData(item);
              setValueUpdate(item);
            }
          }
        }
      });
    }
  }, [props.data]);
  const handleChangeCategory = (value) => {
    setValueUpdate(value);
  };

  const handleClickUpdate = async () => {
    if (valueUpdate == "") {
      alert("Please select value");
    } else {
      console.log(valueUpdate);
      const data = {
        categoryID: valueUpdate._id,
      };
      const branchID = props.data._id;
      await addCategoryBranch(branchID, data).then((res) => {
        props.handleSuccess();
      });
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Branch to Category</DialogTitle>
        <DialogContent style={{ width: "500px" }}>
          <SelectCategory
            data={arrCate}
            handleChange={handleChangeCategory}
            value={defaultData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleClickUpdate();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
