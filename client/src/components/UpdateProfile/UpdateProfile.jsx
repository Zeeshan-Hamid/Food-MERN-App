import "./updateProfile.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateProfile() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { userName, email, password } = Object.fromEntries(formData);
    try {
      console.log(currentUser);
      const res = await axios.put(
        `http://localhost:5000/update/${currentUser._id}`,
        { userName, email, password },
        { withCredentials: true }
      );
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updateProfile">
      <h1 className="signup-form-title">Update Your Profile</h1>
      <form method="post" onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          defaultValue={currentUser.email}
          className="signup-form-input"
        />
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Enter your name"
          defaultValue={currentUser.userName}
          className="signup-form-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          className="signup-form-input"
        />
        <button type="submit" className="signup-form-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
