import "./addFood.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadWidget from "../UploadWidget/UploadWidget";
import { useState } from "react";

const AddFood = () => {
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, carbs, calories, fats, protein, serving_size, type } =
      Object.fromEntries(formData);

    try {
      const url = "http://localhost:5000/api/add-food";
      const response = await axios.post(
        url,
        {
          name,
          image,
          carbs,
          calories,
          fats,
          protein,
          serving_size,
          type,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Congratulations, the food has been added!");
        console.log("Food Added", response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Food with this name already exists.");
        } else {
          toast.error("An error occurred while adding the food.");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="addFood">
      <h2>Add Food here</h2>
      <div className="upload-widget-container">
        <UploadWidget
          uwConfig={{
            cloudName: "dyekj8t4e",
            uploadPreset: "estate",
            multiple: false,
            folder: "Avatars",
            maxImageFileSize: 2000000,
          }}
          setImage={setImage}
        />
      </div>
      <img
        style={{ width: "100px", textAlign: "center" }}
        src={
          image
            ? image
            : "https://png.pngtree.com/png-clipart/20191121/original/pngtree-upload-vector-icon-with-transparent-background-png-image_5156946.jpg"
        }
        alt=""
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          autoComplete="false"
        />
        <input type="number" name="carbs" placeholder="Carbs per serving" />
        <input type="number" name="calories" placeholder="Calories" />
        <input type="number" name="fats" placeholder="Fats" />
        <input type="number" name="protein" placeholder="Proteins" />
        <input type="text" name="serving_size" placeholder="Serving Size" />
        <select name="type">
          <option value="Fast Food">Fast Food</option>
          <option value="Stew">Stew</option>
          <option value="Rice Dish">Rice Dish</option>
          <option value="Snack">Snack</option>
          <option value="Drink">Drink</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Bread">Bread</option>
          <option value="Curry">Curry</option>
          <option value="Grilled Meat">Grilled Meat</option>
        </select>

        <button type="submit">Add Food</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFood;
