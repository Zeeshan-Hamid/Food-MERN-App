import { NavLink } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa";
import Logo from "../../assets/react.svg";
import "./style.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        <div className="sub-nav">
          <ul className="nav-list">
            <li className="nav-links">
              <NavLink className=" active nav-links-a" to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="nav-links">
              <NavLink className="nav-links-a" to={"/food"}>
                Food
              </NavLink>{" "}
            </li>
            <li className="nav-links">
              <NavLink className="nav-links-a" to={"/signup"}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="side-menu">
          <FaSearchengin className="search-icon" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
