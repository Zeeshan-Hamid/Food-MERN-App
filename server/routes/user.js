const router = require("express").Router();
const userController = require("../controllers/user.js");
const userVerification = require("../middleware/auth.js");

router.post(
  "/add-to-favourites/:id",
  userVerification.userVerification,
  userController.addToFavourites
);

router.get("/user-favourites/:id", userController.getUserFavourites);

module.exports = router;
