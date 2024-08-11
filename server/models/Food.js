const mongoose = require("mongoose");
const commentSchema = require('./Comments.js')


const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    serving_size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Fast Food",
        "Stew",
        "Rice Dish",
        "Snack",
        "Drink",
        "Breakfast",
        "Bread",
        "Curry",
        "Grilled Meat",
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", 
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
