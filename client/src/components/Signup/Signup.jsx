import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          userName,
          password,
        },
        { withCredentials: true }
      ); // <-- Add this
      if (response.data.error === "none") {
        console.log("Signup ho gya");
        navigate("/login");
      } else {
        alert("ni hoa is baar bhi");
      }
    } catch (error) {
      console.log("Lo g signup bhi war gya", error);
    }
  };

  return (
    <>
      <h1 className="signup-form-title">Signup Page</h1>
      <form onSubmit={handleSubmit} method="post" className="signup-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="signup-form-input"
        />
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="signup-form-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="signup-form-input"
        />
        <button type="submit" className="signup-form-button">
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;
