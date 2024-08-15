import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Card from "../Card/Card";
import axios from "axios";


const url = "http://localhost:5000/api/";

const FoodList = () => {
  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState([]);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      const getAllFoodItems = async () => {
        try {
          const { data } = await axios.get(url);
          setFoodItems(data); // Assuming the response is an array of food items
        } catch (error) {
          console.error("Error fetching food items:", error);
        } finally {
          setLoading(false);
        }
      };
      getAllFoodItems();
    }, []);

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <Card foodItems={foodItems} liked={liked} setLiked={setLiked} />
        )}
      </>
    );
};

export default FoodList;
