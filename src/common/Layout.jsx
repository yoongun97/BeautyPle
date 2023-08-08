import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/login/LogIn";

const Layout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
