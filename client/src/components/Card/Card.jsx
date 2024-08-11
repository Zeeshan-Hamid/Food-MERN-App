import "./style.scss";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Card = ({ foodItems }) => {
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  console.log(currentUser);
  const handleClick = async (id) => {
    
    try {
      const userId = currentUser._id;
      const response = await axios.post(
        `http://localhost:5000/api/add-to-favourites/${id}/${userId}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalCalories = foodItems.reduce(
    (total, item) => total + item.calories,
    0
  );
  if (!foodItems || foodItems.length === 0) {
    return (
      <h3 style={{ textAlign: "center" }}>Items could not be retrieved</h3>
    );
  }
  return (
    <div className="card-section">
      <h1>
        Featured <span>Food Items</span>
      </h1>

      <div className="grid-4">
        {foodItems.map((item) => (
          <div key={item._id} className="ft-recipe">
            <div className="ft-recipe__thumb">
              <h3>Today's Featured Recipe</h3>
              <img src={item.image} alt={item.name} />
            </div>
            <div className="ft-recipe__content">
              <header className="content__header">
                <div className="row-wrapper">
                  <h2 className="recipe-title">{item.name}</h2>
                  <div className="user-rating"></div>
                </div>
                <ul className="recipe-details">
                  <li className="recipe-details-item time">
                    <i className="ion ion-ios-clock-outline"></i>
                    <span className="value">{item.calories}</span>
                    <span className="title">Calories</span>
                  </li>
                  <li className="recipe-details-item ingredients">
                    <i className="ion ion-ios-book-outline"></i>
                    <span className="value">{item.protein}</span>
                    <span className="title">Proteins</span>
                  </li>
                  <li className="recipe-details-item servings">
                    <i className="ion ion-ios-person-outline"></i>
                    <span className="value">{item.serving_size}</span>
                    <span className="title">Serving</span>
                  </li>
                </ul>
              </header>

              <footer className="content__footer">
                <div className="left">
                  <button>
                    <Link to={`/food/${item._id}`}>View Details</Link>
                  </button>
                </div>
                <div className="right">
                  <button
                    onClick={() => {
                      handleClick(item._id);
                      setLiked(!liked);
                    }}>
                    <FaHeart
                      style={{
                        color: liked ? "red" : "grey",
                        transition: "color 0.3s ease",
                        fontSize: "24px",
                      }}
                    />
                  </button>
                </div>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
