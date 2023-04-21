import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addCategory, addSubCategory } from '../../api/admin.api';

export default function ModalAddCategory(props) {
    const [name, setName] = useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleCategory = async () => {
        if(name === '' || !name){
            alert("Please sumbit category name");
        }else{
          if(props?.type == 'sub'){
            await addSubCategory(props?.categoryID, {subCategoryName: name}).then(() => {
              props.handleSuccess();
            })
          }else{
            await addCategory({categoryName: name, type:"product"}).then(() => {
              props.handleSuccess();
            })
          }
        }
    }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent style={{width:"500px"}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            fullWidth
            onChange={(e) => {handleChange(e)}}
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
