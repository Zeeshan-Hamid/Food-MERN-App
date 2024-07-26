import Navbar from "../components/Navbar/Navbar";
import FoodList from "../components/FoodList/FoodList";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }
      console.log(cookies.token);
      const { data } = await axios.post(
        "http://localhost:5000/verify",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <Navbar />
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
      <FoodList />
    </>
  );
};

export default HomePage;
