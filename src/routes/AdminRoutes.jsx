import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CategoryScreens from "../page/Category/screens/CategoryScreens";
import EditCategoryScreens from "../page/Category/screens/EditCategoryScreens";
import path, { EDIT_CATEGORY, ORDER } from "../resources/path";
import LoadingComponent from "../components/Loading/Loading";
import BranchScreens from "../page/Branch/screens/BranchScreens";
import UserScreens from "../page/User/screens/UserScreens";
import ProductScreens from "../page/Product/screens/ProductScreens";
import AddProduct from "../page/Product/AddProduct";
import Dashboard from "../page/Dashboard/Dashboard";
import EditProduct from "../page/Product/EditProduct";
import Order from "../page/Order/screens/Order";

const AdminRoutes = () => {
  const [loading, setLoading] = useState(false);
  const handleLoading = (status) => {
    setLoading(status);
  };
  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <Route
        path={path.CATEGORY}
        render={() => <CategoryScreens handleLoading={handleLoading} />}
      />
      <Route
        path={path.EDIT_CATEGORY}
        render={(props) => (
          <EditCategoryScreens {...props} handleLoading={handleLoading} />
        )}
      />
      <Route
        path={path.BRANCH}
        render={() => <BranchScreens handleLoading={handleLoading} />}
      />
      <Route
        path={path.USER}
        render={() => <UserScreens handleLoading={handleLoading} />}
      />
      <Route
        path={path.PRODUCT}
        render={() => <ProductScreens handleLoading={handleLoading} />}
      />
      <Route
        path={path.ADD_PRODUCT}
        render={() => <AddProduct handleLoading={handleLoading} />}
      />
      <Route
        path={path.DASHBOARD}
        render={() => <Dashboard handleLoading={handleLoading} />}
      />
      <Route
        path={path.EDIT_PRODUCT}
        render={(props) => (
          <EditProduct handleLoading={handleLoading} {...props} />
        )}
      />
      <Route
        path={path.ORDER}
        render={(props) => <Order handleLoading={handleLoading} {...props} />}
      />
    </>
  );
};

export default AdminRoutes;
