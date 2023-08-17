import SideBar from "@components/Sidebar";
import "../App.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="container">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
