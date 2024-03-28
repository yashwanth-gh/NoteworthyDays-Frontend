import React from "react";
import { Outlet } from "react-router-dom";
import { Bottombar, Topbar } from "./root_pages";

const RootLayout = () => {
  return (
    <div className="w-full flex-col">
    <header>
      <Topbar/>
    </header>
      <section>
        <Outlet />
      </section>
      <footer>
        <Bottombar/>
      </footer>
    </div>
  );
};

export default RootLayout;
