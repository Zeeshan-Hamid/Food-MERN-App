// src/components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./style.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <div className="logo">Calorie</div>
      <div className="hamburger" onClick={toggleMenu}>
        <FiMenu />
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/about" className="menu-item">
          About
        </Link>
        <Link to="/services" className="menu-item">
          Services
        </Link>
        <Link to="/portfolio" className="menu-item">
          Portfolio
        </Link>
        <Link to="/contact" className="menu-item">
          Contact
        </Link>
        <div className="icons">
          <Link to={"/search"}>
            <FaSearch />
          </Link>
          <FaLinkedin />
          <FaGithub />
        </div>
      </div>
    </nav>
  );
};

export default Header;
