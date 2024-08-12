const router = require("express").Router();
const foodController = require("../controllers/food");
const userVerification = require("../middleware/auth");

router.get("/", foodController.getAll);

router.get("/search", foodController.searchFood);

router.get("/food/:id", foodController.getFood);

router.get("/fullSearch", foodController.fullSearch);

router.post(
  "/add-food",
  userVerification.userVerification,
  foodController.addFood
);

router.delete(
  "/delete-food/:id",
  userVerification.userVerification,
  foodController.deleteFood
);

router.put(
  "/update/:id",
  userVerification.userVerification,
  foodController.updateFood
);

router.post("/add-to-favourites/:id/:userId", foodController.addToFavourites);

router.post("/comment/:foodId", foodController.addComments);

router.get("/comments/:foodId", foodController.getComments);

module.exports = router;
