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
import { getListOrder } from "../../../api/admin.api";

const UserScreens = (props) => {
  const history = useHistory();
  const [listsCategory, setListsCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getListOrder().then((res) => {
      setListsCategory(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const columnsOrder = [
    { field: "stt", headerName: "No.", width: 110 },
    { field: "fullName", headerName: "User name", width: 150 },
    { field: "phoneNumber", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "total", headerName: "Total", width: 110 },
    { field: "paypal", headerName: "PayPal", width: 220 },
    { field: "created", headerName: "Created", width: 220 },
  ];
  const rowsOrder = listsCategory.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      fullName: e.fullName,
      address: e?.address,
      phoneNumber: e.phoneNumber,
      total: e.totalPrice + "$",
      paypal: e.paypalID,
      created: new Date(e.created),
      action: e._id,
    };
  });
  return (
    <Grid>
      <Grid className="head-title">
        <span>Order Manager:</span>
      </Grid>
      <hr />
      <Grid>
        <TableComponent columns={columnsOrder} rows={rowsOrder} />
      </Grid>
    </Grid>
  );
};

export default UserScreens;
