const Food = require("../models/Food.js");
const User = require("../models/User.js");


exports.addToFavourites = async (req, res, next) => {
  const tokenId = req.userId;
  const foodId = req.body.id;
  try {
    const user = await User.findById(tokenId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    if (user.favourites.includes(foodId)) {
      return res.status(400).json({ message: "Food is already in favourites" });
    }

    user.favourites.push(foodId);
    await user.save();
    res.status(200).json({
      message: "Food added to favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserFavourites = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("favourites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favouritesAsStrings = user.favourites.map((favourite) => ({
      ...favourite._doc, 
      _id: favourite._id.toString(), 
    }));

    res.status(200).json(favouritesAsStrings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};



  exports.deleteFromFavourites = async (req, res, next) => {
    const userId = req.params.userId;
    const foodId = req.params.id;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }


      const foodObjectId = foodId;
      user.favourites = user.favourites.filter(
        (fav) => !fav.equals(foodObjectId)
      );
      await user.save();
      res.status(200).json({
        message: "Food removed from favourites",
        favourites: user.favourites,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
};
  



