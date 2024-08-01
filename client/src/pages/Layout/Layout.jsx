import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const Layout = () => {
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
        } else {
          removeCookie("token", {
            path: "/",
            sameSite: "Strict",
            secure: true,
          });
          setIsLoggedIn(false); // User is not logged in
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
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} />
      <Outlet />
    </>
  );
};

export default Layout;
