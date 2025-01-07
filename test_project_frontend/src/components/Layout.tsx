// import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

// interface Layout_int {
//   children: ReactNode;
// }

const Layout = () => {
  return (
    <div className="">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
