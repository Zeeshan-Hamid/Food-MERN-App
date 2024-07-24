import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search Bar/Search";
import Search_Table from "../components/Search Table/Search_Table";
import Spinner from "../components/Spinner/Spinner";
import Navbar from "../components/Navbar/Navbar";

const searchUrl = "http://localhost:5000/api/search";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.length >= 3) {
        searchFoodItems();
      } else {
        setFoodItems([]); // Reset food items if search length is less than 3
      }
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Clear the timeout if the component unmounts or search changes
    };
  }, [search]);

  const searchFoodItems = async () => {
    try {
      setLoading(true); // Start loading when user enters at least 3 characters
      let url = `${searchUrl}?search=${search}`;
      const { data } = await axios.get(url);
      console.log(data);
      setFoodItems(data);
    } catch (error) {
      console.log("Error occurred", error);
    } finally {
      setLoading(false); // Stop loading after API call
    }
  };

  return (
    <>
      <Navbar />
      <Search setSearch={setSearch} />
      {loading ? <Spinner /> : <Search_Table foodItems={foodItems} />}
    </>
  );
};

export default SearchPage;
