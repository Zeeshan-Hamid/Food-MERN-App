import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import FoodList from "../components/FoodList/FoodList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {

  return (
    <>
      {/* <Hero /> */}
      <ToastContainer />
      <FoodList />
    </>
  );
};

export default HomePage;
