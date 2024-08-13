const verifyUser = require("../middleware/auth");
const blogController = require("../controllers/blog");

const router = require("express").Router();

router.post("/add-blog", verifyUser.userVerification, blogController.addBlog);

router.get("/get-blogs", blogController.getBlogs);

router.delete(
  "/delete/:id",
  verifyUser.userVerification,
  blogController.deleteBlog
);

module.exports = router;
