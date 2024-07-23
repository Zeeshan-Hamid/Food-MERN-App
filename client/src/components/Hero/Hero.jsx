import React from "react";
import "./style.css";
import Logo from "../../assets/react.svg";
const Hero = () => {
  return (
    <div className="container">
      <div className="left">
        <h1>Welcome to the food App</h1>
        <button className="btn">Jay Ho</button>
      </div>
      <div className="right">
        <img src={Logo} className="right-logo" alt="image" />
      </div>
    </div>
  );
};

export default Hero;
