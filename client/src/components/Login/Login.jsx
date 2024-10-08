import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";


import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
 
  const { updateUser } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 403) {
        setError(true);
      } else if (response.status === 200) {
        console.log("response data status", response.data);
        updateUser(response.data);
        toast.success("Congratulations!");
        navigate("/");
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="form-title">Login Form</h1>
      <br />
      
      <form onSubmit={handleLogin} method="post" className="login-form">
        
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="form-input"
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="form-input"
        />
        {error && <p>Invalid email or password</p>}
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
