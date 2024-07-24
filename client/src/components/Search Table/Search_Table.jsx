import React from "react";
import { Link } from "react-router-dom";

const Search_Table = ({ foodItems }) => {
  return (
    <>
      <h1>Search results</h1>
      <br />
      {foodItems.length === 0 ? (
        <h3>No items retrieved</h3>
      ) : (
        foodItems.map((item) => (
          <div key={item._id} style={{ border: "1px solid #333" }}>
            <Link to={`/food/${item._id}`}>
              <h3>{item.name}</h3>
              <img src={item.image} alt={item.name} />
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default Search_Table;
