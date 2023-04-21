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
import ModalConfirmDelete from "../../../components/Modal/ModalConfirm";
import { deleteCategroy } from "../../../api/admin.api";

const CategoryScreens = (props) => {
  const history = useHistory();
  const [listsCategory, setListsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [categoryID, setCategoryID] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getCategoryProduct().then((res) => {
      setListsCategory(res.data);
    });
    props.handleLoading(false);
  }, [reload]);
  const columns = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "categoryName", headerName: "Category Name", width: 220 },
    { field: "subCategory", headerName: "Sub Category", width: 220 },
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
    console.log(e);
    return {
      id: index,
      stt: index + 1,
      categoryName: e.categoryName,
      subCategory: e?.subCategory?.length,
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

  const handleClickDelete = (id) => {
    setCategoryID(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setCategoryID();
    setOpenDelete(false);
  };

  const handleConfirmDelete = async () => {
    props.handleLoading(true);
    await deleteCategroy(categoryID).then((res) => {
      handleCloseDelete();
      setReload(!reload);
    });
  };

  return (
    <Grid>
      <Grid className="head-title">
        <span>
          Category Manager:{" "}
          <ButtonAddComponent
            title="Add Category"
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

export default CategoryScreens;
