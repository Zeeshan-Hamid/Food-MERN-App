const router = require("express").Router();
const foodController = require('../controllers/food')




router.get('/', foodController.getAll)

router.get("/food", );






module.exports = router;