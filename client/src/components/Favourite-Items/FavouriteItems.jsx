import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./favourites.scss";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleDelete = async(id) => {
    try {
    const response = await axios.delete(
      `http://localhost:5000/user/delete-favourites/${currentUser._id}/${id}`
      );
      console.log(response)
    } catch (error) {
      console.log(error)
  }
}

   
console.log(currentUser._id)
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/user-favourites/${currentUser._id}`
        );
        console.log(response);
        setFavourites(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [currentUser._id]);

  // Calculate total calories
  const totalCalories = favourites.reduce(
    (total, food) => total + food.calories,
    0
  );

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="favourites-container">
      {favourites.length === 0 ? (
        <p className="no-favourites">You have no favourites yet.</p>
      ) : (
        <>
          <ul className="favourites-list">
            {favourites.map((food) => (
              <>
                <li key={food._id} className="favourite-item">
                  <img
                    className="food-image"
                    src={food.image}
                    alt={food.name}
                    width="50"
                  />
                  <h3 className="food-name">{food.name}</h3>
                  <p className="food-calories">Calories: {food.calories}</p>
                  <p className="food-carbs">Carbs: {food.carbs}</p>
                  <p className="food-fats">Fats: {food.fats}</p>
                  <p className="food-protein">Protein: {food.protein}</p>
                </li>
                <Link to={`/food/${food._id}`}>
                  <button>View Details</button>
                </Link>
                <button onClick={()=>handleDelete()}>Delete</button>
              </>
            ))}
          </ul>
          <h2 className="total-calories">Total Calories: {totalCalories}</h2>
        </>
      )}
    </div>
  );
};

export default Favourites;
