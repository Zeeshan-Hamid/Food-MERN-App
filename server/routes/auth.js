const router = require("express").Router();
const authController = require("../controllers/auth");
const middlewareAuth = require("../middleware/auth");

router.post("/signup", authController.Signup);
router.post("/login", authController.Login);

router.post("/logout", (req, res) => {
  res.clearCookie("token").status(201).json({ message: "Logout Successful" });
});
router.put("/update/:id", authController.updateUser);
module.exports = router;
