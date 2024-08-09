import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../UploadWidget/UploadWidget";
import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  console.log("Image url is the ", image);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          userName,
          password,
          image,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.status !== false) {
        console.log("Signup ho gya");
        navigate("/login");
      } else {
        alert("User Already Exists bhai");
      }
    } catch (error) {
      console.log("Lo g signup bhi war gya", error);
    }
  };

  return (
    <div className="signup">
      <h1 className="signup-form-title">Signup Page</h1>
      <UploadWidget
        uwConfig={{
          cloudName: "dyekj8t4e",
          uploadPreset: "estate",
          multiple: false,
          folder: "Avatars",
          maxImageFileSize: 2000000,
        }}
        setImage={setImage}
      />
      <form onSubmit={handleSubmit} method="post" className="signup-form">
        <img
          className="signup-img"
          src={
            image
              ? image
              : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
          }
          alt=""
          signup-img
        />
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
    </div>
  );
};

export default Signup;
