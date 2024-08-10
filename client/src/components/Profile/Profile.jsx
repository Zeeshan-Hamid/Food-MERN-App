import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Favourites from "../Favourite-Items/FavouriteItems";
import axios from "axios";
import "./profile.scss";
const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  console.log(currentUser.image);
  const Logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );

      updateUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  return (
    <div className="profile">
      <div className="left">
        <h2 className="profile_heading">
          Hello{" "}
          <span>
            {currentUser.userName[0].toUpperCase() +
              currentUser.userName.slice(1)}
          </span>
        </h2>

        <img src={currentUser.image} alt="" />
        <button onClick={() => Logout()}>Logout</button>
        <div className="update">
          <h3>Want to Update Profile</h3>
          <Link to={"/update-profile"} className="noUnderLine">
            Update Profile
          </Link>
        </div>
        <div className="foodList">
          <h2>Here's the list of food you uploaded</h2>
        </div>
      </div>

      <div className="right">
        <h2>Food You Liked</h2>
        <Favourites />
      </div>
    </div>
  );
};

export default Profile;
