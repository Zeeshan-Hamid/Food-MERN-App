import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
