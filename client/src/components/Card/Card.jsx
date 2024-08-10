import "./style.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Card = ({ foodItems }) => {
  const { currentUser } = useContext(AuthContext);
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

  if (!foodItems || foodItems.length === 0) {
    return <h1>Items could not be retrieved</h1>;
  }
  const totalCalories = foodItems.reduce(
    (total, item) => total + item.calories,
    0
  );

  return (
    <div className="grid-4">
      {foodItems.map((item) => (
        <div key={item._id} className="card">
          <img src={item.image} alt="Food Image" />
          <div className="card-body">
            <Link to={`/food/${item._id}`}>
              {" "}
              <h2 className="card-title">{item.name}</h2>
            </Link>
            <p className="card-text">Calories: {item.calories}</p>
            <p className="card-text">Serving: {item.serving_size}</p>
            <button
              onClick={() => {
                handleClick(item._id);
              }}>
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
