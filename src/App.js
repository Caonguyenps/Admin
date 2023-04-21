import "./assets/css/style.css";
import { BrowserRouter, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import path from "./resources/path";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./routes/AdminRoutes";
import LoginScreens from "./page/Login/screens/LoginScreens";
import MainLayout from "./layouts/MainLayout";
import { checkLogin, isLoggin } from "./auth/auth";
import { useHistory } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route
          path="/admin"
          render={() => {
            isLoggin() ? window.location.href = "http://localhost:3000/admin" : window.location.href = "http://localhost:3000/login";
          }}
        /> */}
         <Route path='/login' component={LoginScreens} />
         <Route path={path.ADMIN} render={() => <MainLayout />} />

      </Switch>
    </BrowserRouter>
  );
}
