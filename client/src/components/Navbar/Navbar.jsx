// src/components/Header.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <NavLink to="/login" className="menu-item">
          Login
        </NavLink>

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
