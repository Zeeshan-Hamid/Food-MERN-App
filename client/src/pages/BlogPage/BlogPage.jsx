import "./BlogPage.scss";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import BlogCard from "../../components/BlogCard/BlogCard";

const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blog/get-blogs");
        setBlogItems(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogs();
  }, []);


  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="left">
          <div className="top">
            <img src={blogItems[0].image} alt="" />
          </div>
          <div className="body">
            <h2>{blogItems[0].title}</h2>
            <Link></Link>
          </div>
        </div>
        <div className="right">BLog List</div>
      </div>
      <div className="blog-card-container">
        {blogItems.slice(1).map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
