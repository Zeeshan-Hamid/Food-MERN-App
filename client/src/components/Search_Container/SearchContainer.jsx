import { useState } from "react";
import "./searchContainer.scss";
import { Link } from "react-router-dom";
const SearchContainer = ({ foodItems }) => {
  const [cross, setCross] = useState(true);
  const handleCross = () => {
    setCross(!cross);
  };
  return (
    <>
      <div className={cross ? "searchContainer" : "searchContainer hide"}>
        <button className="cross" onClick={() => handleCross()}>
          X
        </button>
        {foodItems.length !== 0 ? (
          <>
            {foodItems.map((item, index) => (
              <Link className="noUnderLine" to={`/food/${item._id}`}>
                <div key={index} className="searchItems">
                  <div className="searchImage">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="searchText">
                    <h2>{item.name}</h2>
                    <p>
                      Calories: <span>{item.calories}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p className="errorText">No Items Found</p>
        )}
      </div>
    </>
  );
};

export default SearchContainer;
