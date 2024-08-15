import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaLinkedin, FaGithub } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import SearchContainer from "../Search_Container/SearchContainer";
import axios from "axios";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [search, setSearch] = useState("");
  const [container, setContainer] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  const userContainerRef = useRef(null);
  const subMenuRef = useRef(null);
  const searchContainerRef = useRef(null);

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
      let url = `${searchUrl}?search=${search}&limit=3`;
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
      setUser(false);
      updateUser(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userContainerRef.current &&
        !userContainerRef.current.contains(event.target)
      ) {
        setUser(false);
      }

      if (
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setContainer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="foodContainer" ref={searchContainerRef}>
            {container ? <SearchContainer foodItems={foodItems} /> : ""}
          </div>
        </div>
        <div className="menu">
          <div className="user">
            {currentUser ? (
              <button onClick={toggleUser}>
                <CgProfile style={{ color: "black" }} />
              </button>
            ) : (
              ""
            )}
            <div
              ref={userContainerRef}
              className={user ? "userContainer active" : "userContainer"}>
              {currentUser ? (
                <>
                  <img
                    src={currentUser.image}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <p>{currentUser.userName}</p>
                  <Link to={"/profile"}>Profile</Link>
                  <button onClick={Logout}>Logout</button>
                </>
              ) : (
                <>
                  <button>Login</button>
                </>
              )}
            </div>
          </div>
          <button onClick={toggleMenu}>
            {!isOpen ? (
              <FiMenu style={{ color: "black" }} />
            ) : (
              <ImCancelCircle style={{ color: "black" }} />
            )}
          </button>
        </div>
      </nav>

      <div
        ref={subMenuRef}
        className={isOpen === true ? "subMenu active" : "subMenu"}
        onClick={toggleMenu}>
        <Link className="noUnderLine" to={"/"}>
          Home
        </Link>
        <Link className="noUnderLine" to={"/"} onClick={toggleMenu}>
          Food
        </Link>
        {!currentUser ? (
          <>
            <Link className="noUnderLine" to={"/login"} onClick={toggleMenu}>
              Login
            </Link>
            <Link className="noUnderLine" to={"/signup"} onClick={toggleMenu}>
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link className="noUnderLine" onClick={Logout}>
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
        onClick={toggleMenu}></div>
    </>
  );
};

export default Navbar;
