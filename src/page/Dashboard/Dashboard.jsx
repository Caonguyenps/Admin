import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { statics } from "../../api/admin.api";
import TableComponent from "../../components/Table/Table.component";
const Dashboard = (props) => {
  const [data, setData] = useState();
  const datenow = new Date().setHours(0, 0, 0, 0);
  const [userNew, setUserNew] = useState([]);
  const [orderNew, setOrderNew] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);
    await statics().then((res) => {
      setData(res.data);
      console.log(res);
      for (let item of res.data.user) {
        let date = new Date(item.created).setHours(0, 0, 0, 0);
        if (date == datenow) {
          setUserNew((userNew) => [...userNew, item]);
        }
      }
      for (let item of res.data.order) {
        let date = new Date(item.createAt).setHours(0, 0, 0, 0);
        if (date == datenow) {
          setOrderNew((orderNew) => [...orderNew, item]);
        }
      }
    });
    console.log(orderNew);
    props.handleLoading(false);
  }, []);
  const columns = [
    { field: "stt", headerName: "STT", width: 110 },
    { field: "fullName", headerName: "User name", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phoneNumber", headerName: "Phone", width: 220 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "created", headerName: "Created", width: 220 },
  ];

  const columnsOrder = [
    { field: "stt", headerName: "STT", width: 110 },
    { field: "fullName", headerName: "User name", width: 150 },
    { field: "phoneNumber", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "total", headerName: "Total", width: 110 },
    { field: "paypal", headerName: "PayPal", width: 220 },
    { field: "created", headerName: "Created", width: 220 },
  ];
  const rowsOrder = orderNew.map((e, index) => {
    console.log(e);
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
  const rows = userNew.map((e, index) => {
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
  return (
    <div className="card-list dashboard">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card blue">
            <div className="title">Total category</div>
            <i className="zmdi zmdi-upload" />
            <div className="value">{data?.category?.length}</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card green">
            <div className="title">Total product</div>
            <i className="zmdi zmdi-upload" />
            <div className="value">{data?.product?.length}</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card orange">
            <div className="title">total order</div>
            <i className="zmdi zmdi-download" />
            <div className="value">{data?.order?.length}</div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
          <div className="card red">
            <div className="title">Total customers</div>
            <i className="zmdi zmdi-download" />
            <div className="value">{data?.user?.length}</div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h3>Overview - Today</h3>
      </div>
      <div className="mt-3">
        <div className="row">
          <div className="col-6">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="card red">
                <div className="title">New Customer</div>
                <i className="zmdi zmdi-download" />
                <div className="value">{userNew?.length}</div>
              </div>
            </div>
            <hr />
            <div className="mt-3">
              <TableComponent columns={columns} rows={rows} />
            </div>
          </div>
          <div className="col-6">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="card orange">
                <div className="title">New Order</div>
                <i className="zmdi zmdi-download" />
                <div className="value">{orderNew?.length}</div>
              </div>
            </div>
            <hr />
            <div className="mt-3">
              <TableComponent columns={columnsOrder} rows={rowsOrder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
