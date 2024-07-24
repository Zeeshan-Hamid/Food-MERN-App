import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Card from "../components/Card/Card";

const base_url = "http://localhost:5000/api/";

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getAllFoodItems = async () => {
      try {
        const { data } = await axios.get(base_url);
        setFoodItems(data); // Assuming the response is an array of food items
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    getAllFoodItems();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Card foodItems={foodItems} />
    </>
  );
};

export default HomePage;
