import FoodList from "../components/FoodList/FoodList";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <>
      {/* <Hero /> */}
      <Banner />
      <ToastContainer />
      <FoodList />
    </>
  );
};

export default HomePage;
