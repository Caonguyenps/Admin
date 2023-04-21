import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addBranch, addCategory, updateBranch, updateSubCategory } from '../../api/admin.api';

export default function ModalUpdateSubCategory(props) {
    const [name, setName] = useState(props?.data?.branchName);
    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleCategory = async () => {
        if(name === '' || !name){
            alert("Please sumbit sub name");
        }else{
            await updateSubCategory(props?.data?._id, {subCategoryName: name}).then(() => {
                props.handleSuccess();
            })
        }
    }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Sub Category Name</DialogTitle>
        <DialogContent style={{width:"500px"}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="SubCategory Name"
            fullWidth
            onChange={(e) => {handleChange(e)}}
            defaultValue={props?.data?.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {handleCategory()}} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
