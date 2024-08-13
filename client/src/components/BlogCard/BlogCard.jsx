import "./blogCard.scss";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="top">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="body">
        <div className="card-heading">
          <h3>{blog.title}</h3>
        </div>
        <button>Read Blog</button>
      </div>
    </div>
  );
};

export default BlogCard;
