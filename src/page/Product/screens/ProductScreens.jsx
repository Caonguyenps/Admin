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
import {
  deleteProduct,
  getListProduct,
  getListsUser,
} from "../../../api/admin.api";
import ModalConfirmDelete from "../../../components/Modal/ModalConfirm";

const ProductScreens = (props) => {
  const history = useHistory();
  const [listsCategory, setListsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getListProduct().then((res) => {
      console.log(res);
      setListsCategory(res.data);
    });
    props.handleLoading(false);
  }, [reload]);
  const columns = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "code", headerName: "Code", width: 150 },
    { field: "productName", headerName: "Product Name", width: 320 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "created", headerName: "Created", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (action) => {
        return (
          <>
            <ButtonEditComponent
              handleClick={() => {
                handleClickEdit(action.row.action);
              }}
            />
            <ButtonDeleteComponent
              handleClick={() => {
                handleClickDelete(action.row.action);
              }}
            />
          </>
        );
      },
    },
  ];
  const rows = listsCategory.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      code: e.code,
      productName: e.productName,
      price: e?.price,
      created: new Date(e.created),
      action: e._id,
    };
  });

  const handleClickEdit = (id) => {
    console.log(id);
    history.push(`/admin/edit-product/${id}`);
  };

  const handleClickAdd = () => {
    history.push(path.ADD_PRODUCT);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
    setReload(!reload);
  };

  const handleClickDelete = (id) => {
    setDeleteID(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeleteID();
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    props.handleLoading(true);
    await deleteProduct(deleteID).then(() => {
      handleCloseDelete();
      setReload(!reload);
    });
  };

  return (
    <Grid>
      <Grid className="head-title">
        <span>
          Product Manager:
          <ButtonAddComponent
            title="Add product"
            handleClick={handleClickAdd}
          />
        </span>
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
      <ModalConfirmDelete
        open={openDelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
    </Grid>
  );
};

export default ProductScreens;
