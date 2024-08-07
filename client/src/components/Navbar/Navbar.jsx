import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaLinkedin, FaGithub } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import SearchContainer from "../Search_Container/SearchContainer";
import axios from "axios";
import "./navbar.scss";

const Navbar = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [search, setSearch] = useState("");
  const [container, setContainer] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  const searchUrl = "http://localhost:5000/api/search";

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.length >= 2) {
        searchFoodItems();
        setContainer(true);
      } else {
        setFoodItems([]);
        setContainer(false);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const searchFoodItems = async () => {
    try {
      let url = `${searchUrl}?search=${search}`;
      const { data } = await axios.get(url);
      console.log(data);
      setFoodItems(data);
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const Logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUser = () => {
    setUser(!user);
  };

  return (
    <>
      <nav className="navbar">
        <div className="icon">
          <Link to={"/"}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search Item here"
            name="search"
            autoComplete="off"
            onChange={({ currentTarget: input }) => setSearch(input.value)}
          />
          <FaSearch className="searchIcon" />
          <div className="foodContainer">
            {container ? <SearchContainer foodItems={foodItems} /> : ""}
          </div>
        </div>
        <div className="menu">
          <div className="user">
            {isLoggedIn ? (
              <button onClick={() => toggleUser()}>
                <CgProfile />
              </button>
            ) : (
              ""
            )}
            <div className={user ? "userContainer active" : "userContainer"}>
              {isLoggedIn ? (
                <>
                  <CgProfile />
                  <p>{username}</p>
                  <button
                    onClick={() => {
                      Logout();
                    }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button>Login</button>
                </>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              toggleMenu();
            }}>
            {!isOpen ? <FiMenu /> : <ImCancelCircle />}
          </button>
        </div>
      </nav>

      <div className={isOpen === true ? "subMenu active" : "subMenu"}>
        <Link className="noUnderLine" to={"/"}>
          Home
        </Link>
        <Link className="noUnderLine" to={"/"}>
          Food
        </Link>
        {!isLoggedIn ? (
          <>
            <Link className="noUnderLine" to={"/login"}>
              Login
            </Link>
            <Link className="noUnderLine" to={"/"}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              className="noUnderLine"
              onClick={() => {
                Logout();
              }}>
              LogOut
            </Link>
          </>
        )}
        <div className="logo">
          <FaLinkedin />
          <FaGithub />
        </div>
      </div>
      <div
        className={isOpen ? "shadow active" : "shadow"}
        onClick={() => {
          toggleMenu();
        }}></div>
    </>
  );
};

export default Navbar;
