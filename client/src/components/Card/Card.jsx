import "./style.css";
import { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";

const Card = ({ foodItems }) => {
  if (!foodItems || foodItems.length === 0) {
    return <h1>Items could not be retrieved</h1>;
  }

  return (
    <div className="grid-4">
      {foodItems.map((item) => (
        <div key={item._id} className="card">
          <Link to={`/food/${item._id}`}>
            <img src={item.image} alt="Food Image"></img>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-text">Calories: {item.calories}</p>
              <p className="card-text">Serving: {item.serving_size}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Card;
