// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./style.css";

const Navbar = ({ isLoggedIn, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      removeCookie("token", { path: "/" });
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <NavLink to="/">
        <div className="logo">Calorie</div>
      </NavLink>
      <div className="hamburger" onClick={toggleMenu}>
        <FiMenu />
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <NavLink to="/" className="menu-item">
          Home
        </NavLink>
        <NavLink to="/food" className="menu-item">
          Food
        </NavLink>

        {isLoggedIn ? (
          <>
            <p>Hello {username}</p>
            <button className="btn" onClick={Logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="menu-item">
              Login
            </NavLink>
            <NavLink to="/signup" className="menu-item">
              Signup
            </NavLink>
          </>
        )}

        <div className="icons">
          <NavLink to={"/search"}>
            <FaSearch />
          </NavLink>
          <FaLinkedin />
          <FaGithub />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
