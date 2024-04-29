import React from "react";
import { Outlet } from "react-router-dom";

const AdminRootLayout = () => {
  return (
    <>
      <section>
        <h1>Admin Root Layout</h1>
      </section>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default AdminRootLayout;
