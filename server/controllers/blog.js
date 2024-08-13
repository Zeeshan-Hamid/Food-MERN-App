const Blog = require("../models/Blog");
const User = require("../models/User");

exports.addBlog = async (req, res, next) => {
  const id = req.userId;
  console.log("User Id is: ", id);
  const {title, description, image, markdown} = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

      const existingBlog = await Blog.findOne({
        title: { $regex: new RegExp(`^${title}$`, "i") },
      });
      if (existingBlog) {
          return res.status(409).json({message: "blog already exists"})
      }
    const blog = await Blog.create({ title, description, image, markdown, user: id });

    res.status(201).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
         console.log(error);
         res.status(500).json(error);
    }
}


exports.deleteBlog = async (req, res, next) => {
    const id = req.userId;
    const blogId = req.params.id;
    try {
       
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog doesn't exists" });
        }
        if (blog.user.toString() !== id) {
             return res
               .status(403)
               .json({ message: "Blog doesn't belong to user" });
        }
        await Blog.findByIdAndDelete(blogId)
        const allBlogs = await Blog.find();
        res.status(200).json({ message: "Blog deleted successfully", allBlogs });
        
    } catch (error) {
        console.log(error)
         res.status(500).json(error);
    }
}