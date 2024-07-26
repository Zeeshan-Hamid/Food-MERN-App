const router = require("express").Router();
const authController = require("../controllers/auth");
const middlewareAuth = require("../middleware/auth");

router.post("/signup", authController.Signup);
router.post("/login", authController.Login);
router.get("/verify", middlewareAuth.userVerification);

module.exports = router;
