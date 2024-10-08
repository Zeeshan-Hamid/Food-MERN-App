const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food", 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
