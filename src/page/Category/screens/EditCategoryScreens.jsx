import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { getDetailsCategory } from "../../../api/category.api";
import InputComponent from "../../../components/Input/Input.component";
import ButtonSaveComponent from "../../../components/Button/ButtonSaveComponent";
import TableComponent from "../../../components/Table/Table.component";
import ButtonEditComponent from "../../../components/Button/ButtonEdit.component";
import ButtonDeleteComponent from "../../../components/Button/ButtonDeleteComponent";
import ButtonAddComponent from "../../../components/Button/ButtonAdd.component";
import { deleteSubCategory, updateCategoryName } from "../../../api/admin.api";
import ModalAddCategory from "../../../components/Modal/ModalAddCategory";
import ModalConfirmDelete from "../../../components/Modal/ModalConfirm";
import ModalUpdateSubCategory from "../../../components/Modal/ModalUpdateSubCategory";

const EditCategoryScreens = (props) => {
  const search = queryString.parse(props.location.search);
  const categoryID = search.categoryID;
  const [category, setCategory] = useState({ subCategory: [] });
  const [categoryName, setCategoryName] = useState();
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [subCategoryID, setSubCategoryID] = useState();
  const [subEditID, setSubEditID] = useState();
  const [subName, setSubName] = useState();
  const [openEdit, setOpenEdit] = useState();
  useEffect(async () => {
    if (categoryID) {
      props.handleLoading(true);
      await getDetailsCategory(categoryID).then((res) => {
        setCategory(res.data);
        setCategoryName(res.data.categoryName);
      });
      props.handleLoading(false);
    }
  }, [categoryID, reload]);

  const columns = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "subCategoryName", headerName: "SubCategory Name", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
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
                handleClickDelete(action.row.action?.id);
              }}
            />
          </>
        );
      },
    },
  ];
  const rows = category?.subCategory.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      subCategoryName: e.subCategoryName,
      action: {
        id: e._id,
        name: e.subCategoryName,
      },
    };
  });

  const handleUpdateCategory = async () => {
    if (categoryName == "" || !categoryName) {
      alert("Please insert category name");
    } else {
      props.handleLoading(true);
      await updateCategoryName(categoryID, { categoryName: categoryName }).then(
        (res) => {
          setReload(!reload);
        }
      );
    }
  };

  const handleChangeCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleCloseModal();
    handleCloseEdit();
    setReload(!reload);
  };

  const handleClickDelete = (id) => {
    console.log(id);
    setOpenDelete(true);
    setSubCategoryID(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSubCategoryID();
  };

  const handleConfirmDelete = async () => {
    props.handleLoading(true);
    await deleteSubCategory(categoryID, subCategoryID).then((res) => {
      handleCloseDelete();
      setReload(!reload);
    });
  };

  const handleClickEdit = (data) => {
    setSubEditID(data.id);
    setSubName(data.name);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSubEditID();
    setOpenEdit(false);
  };
  return (
    <Grid>
      <Grid className="head-title">
        <span>Edit Main Category</span>
      </Grid>
      <hr />
      <Grid container spacing={1}>
        <Grid item lg={6}>
          <InputComponent
            title={"Category Name"}
            defaultValue={category?.categoryName}
            key={category?.categoryName}
            handleChangeInput={handleChangeCategoryName}
          />
        </Grid>
        <Grid item lg={12}>
          <Grid lg={6}>
            <Grid style={{ float: "right" }}>
              <ButtonSaveComponent handleClick={handleUpdateCategory} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Grid>
        <Grid className="head-title">
          <span>
            Sub Category:{" "}
            <ButtonAddComponent
              title="Add Sub Category"
              handleClick={handleClickOpen}
            />
          </span>
        </Grid>
        <Grid className="mt-3">
          <TableComponent columns={columns} rows={rows} />
        </Grid>
      </Grid>
      <ModalAddCategory
        open={open}
        handleClose={handleCloseModal}
        handleSuccess={handleSuccess}
        type="sub"
        categoryID={categoryID}
      />
      <ModalConfirmDelete
        open={openDelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
      <ModalUpdateSubCategory
        open={openEdit}
        handleClose={handleCloseEdit}
        data={{ _id: subEditID, name: subName }}
        handleSuccess={handleSuccess}
      />
    </Grid>
  );
};

export default EditCategoryScreens;
