import "./foodDetail.scss";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import CommentSection from '../CommentSection/CommentSection'
import axios from "axios";
import { useContext } from "react";

const FoodDetail = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const handleClick = async (id) => {
    try {
      const userId = currentUser._id;
      const response = await axios.post(
        `http://localhost:5000/api/add-to-favourites/${id}/${userId}`
      );
      console.log(response.data);
      toast.success(`${item.name} has been added to you favourites`);
    } catch (error) {
      toast.error(`${item.name} already exists in your favourites`);
      console.log(error);
    }
  };
  return (
    <>
      <div className="food-details">
        <div className="detail-flex">
          <div className="left">
            <img src={item.image} alt="" />
          </div>
          <div className="right">
            <div className="food-item-detail">
              <h1>{item.name}</h1>
              <h2>
                Calories: <span>{item.calories}</span>
              </h2>
              <h2>
                Proteins: <span>{item.protein}</span>
              </h2>
              <h2>
                Carbs: <span>{item.carbs}</span>
              </h2>
              <h2>
                Fats: <span>{item.fats}</span>
              </h2>
              <h2>
                Serving Size: <span>{item.serving_size}</span>
              </h2>
              <h2>
                Food Type: <span>{item.type}</span>
              </h2>
            </div>

            <button onClick={() => handleClick(item._id)}>
              Add to Favourites <FaHeart style={{ color: "white" }} />
            </button>
          </div>
        </div>
        <div className="detail-comments">
      <CommentSection/>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default FoodDetail;
