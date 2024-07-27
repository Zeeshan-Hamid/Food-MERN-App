// src/pages/HomePage.js
import Navbar from "../components/Navbar/Navbar";
import FoodList from "../components/FoodList/FoodList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/verify",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          console.log("User:", data.user.userName);
          setUsername(data.user.userName);
          setIsLoggedIn(true); // User is logged in
          toast(`Hello ${data.user.userName}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token", {
            path: "/",
            sameSite: "Strict",
            secure: true,
          });
          setIsLoggedIn(false); // User is not logged in
          navigate("/login");
        }
      } catch (error) {
        console.log("Verification error:", error);
        setIsLoggedIn(false); // User is not logged in
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <ToastContainer />
      <FoodList />
    </>
  );
};

export default HomePage;
