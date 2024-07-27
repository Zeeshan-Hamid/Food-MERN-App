const router = require("express").Router();
const authController = require("../controllers/auth");
const middlewareAuth = require("../middleware/auth");

router.post("/signup", authController.Signup);
router.post("/login", authController.Login);
router.post("/verify", middlewareAuth.userVerification);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/", // Ensure this matches the path used when setting the cookie
    sameSite: "strict", // Match the sameSite setting
    // domain: "localhost", // Specify if necessary
  });
  res.json({ message: "Logged out successfully" });
});
module.exports = router;
