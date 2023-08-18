import SideBar from "@components/Sidebar";
import "../App.css";
import { Outlet } from "react-router-dom";

function Layout() {
  // компонент макета - на странице всегда будет присутствовать SideBar, а справа от него будут отображаться все другие роуты
  return (
    <>
      <div className="container">
        <SideBar />
        <Outlet />
        {/* Outlet - компонент из библиотеки react-router-dom вместо него отображаются все другие страницы*/}
      </div>
    </>
  );
}

export default Layout;
