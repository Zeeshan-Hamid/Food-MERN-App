const router = require("express").Router();
const foodController = require('../controllers/food')




router.get('/', foodController.getAll)

router.get("/search", foodController.searchFood);

router.get("/food/:id", foodController.getFood);






module.exports = router;