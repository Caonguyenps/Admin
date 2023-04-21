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
import { deleteBranch, getListBranch } from "../../../api/admin.api";
import ModalAddBranch from "../../../components/Modal/ModalAddBranch";
import ModalUpdateBranch from "../../../components/Modal/ModalUpdateBranch";
import ModalConfirmDelete from "../../../components/Modal/ModalConfirm";
import ButtonAddNew from "../../../components/Button/ButtonAddNew.component";
import ModalBranchCategory from "../../../components/Modal/ModalBranchCategory";
const BranchScreens = (props) => {
  const history = useHistory();
  const [listsCategory, setListsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState();
  const [openCate, setOpenCate] = useState(false);
  const [dataSelect, setDataSelect] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getListBranch().then((res) => {
      setListsCategory(res.data);
    });
    props.handleLoading(false);
  }, [reload]);
  const columns = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "branchName", headerName: "Branch Name", width: 220 },
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
                handleClickDelete(action.row.action._id);
              }}
            />
            <ButtonAddNew
              handleClick={() => {
                handleClickAddCategory(action.row.action);
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
      branchName: e.branchName,
      action: e,
    };
  });

  const handleClickEdit = (e) => {
    console.log(e);
    setDataEdit({ _id: e._id, branchName: e.branchName });
    setOpenEdit(true);
  };

  const handleClickAdd = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setOpenEdit(false);
    setDataEdit();
  };

  const handleSuccess = () => {
    handleCloseModal();
    handleCloseCate();
    setReload(!reload);
  };

  const handleCloseDelete = () => {
    setDeleteID();
    setOpenDelete(false);
  };
  const handleClickDelete = (id) => {
    setDeleteID(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    props.handleLoading(true);
    await deleteBranch(deleteID).then(() => {
      handleCloseDelete();
      setReload(!reload);
    });
  };

  const handleClickAddCategory = (data) => {
    setOpenCate(true);
    setDataSelect(data);
  };

  const handleCloseCate = () => {
    setOpenCate(false);
    setDataSelect();
  };

  return (
    <Grid>
      <Grid className="head-title">
        <span>
          Branch Manager:{" "}
          <ButtonAddComponent title="Add branch" handleClick={handleClickAdd} />
        </span>
      </Grid>
      <hr />
      <Grid>
        <TableComponent columns={columns} rows={rows} />
      </Grid>
      <ModalAddBranch
        open={open}
        handleClose={handleCloseModal}
        handleSuccess={handleSuccess}
      />
      <ModalUpdateBranch
        open={openEdit}
        handleClose={handleCloseModal}
        handleSuccess={handleSuccess}
        data={dataEdit}
      />
      <ModalConfirmDelete
        open={openDelete}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
      <ModalBranchCategory
        open={openCate}
        handleClose={handleCloseCate}
        handleSuccess={handleSuccess}
        data={dataSelect}
      />
    </Grid>
  );
};

export default BranchScreens;
