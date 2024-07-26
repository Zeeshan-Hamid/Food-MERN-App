import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      setMessage(response.data.message);
      console.log("response data status", response.data.status);
      if (response.data.status === true) {
        navigate("/");
      }
    } catch (error) {
      setMessage("Login Failed");
    }
  };

  return (
    <>
      <h1>Login Form</h1>
      <br />
      <form onSubmit={handleLogin} method="post">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
        />
        <button type="submit">Login</button>
      </form>
      <br />
      {message && <p>{message}</p>}
    </>
  );
};

export default Login;
