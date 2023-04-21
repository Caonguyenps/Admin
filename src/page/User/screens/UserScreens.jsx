import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getCategoryProduct } from "../../../api/category.api";
import ButtonDeleteComponent from "../../../components/Button/ButtonDeleteComponent";
import ButtonEditComponent from "../../../components/Button/ButtonEdit.component";
import TableComponent from "../../../components/Table/Table.component";
import { useHistory } from "react-router-dom";
import path from "../../../resources/path";
import ButtonAddComponent from "../../../components/Button/ButtonAdd.component";
import ModalAddCategory from "../../../components/Modal/ModalAddCategory";
import { getListsUser } from "../../../api/admin.api";

const UserScreens = (props) => {
  const history = useHistory();
  const [listsCategory, setListsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getListsUser().then((res) => {
      setListsCategory(res.data.listsUser);
    });
    props.handleLoading(false);
  }, [reload]);
  const columns = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "fullName", headerName: "User name", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phoneNumber", headerName: "Phone", width: 220 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "created", headerName: "Created", width: 220 },
  ];
  const rows = listsCategory.map((e, index) => {
    console.log(e);
    return {
      id: index,
      stt: index + 1,
      fullName: e.fullName,
      email: e?.email,
      address: e?.address,
      phoneNumber: e.phoneNumber,
      created: new Date(e.created),
      action: e._id,
    };
  });

  const handleClickEdit = (id) => {
    history.push({ pathname: path.EDIT_CATEGORY, search: `?categoryID=${id}` });
  };

  const handleClickAdd = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
    setReload(!reload);
  };

  return (
    <Grid>
      <Grid className="head-title">
        <span>User Manager:</span>
      </Grid>
      <hr />
      <Grid>
        <TableComponent columns={columns} rows={rows} />
      </Grid>
      <ModalAddCategory
        open={open}
        handleClose={handleCloseModal}
        handleSuccess={handleSuccess}
      />
    </Grid>
  );
};

export default UserScreens;
