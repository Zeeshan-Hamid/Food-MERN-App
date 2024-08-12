import { useRef, useState, useEffect } from "react";
import "./commentSections.scss";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentSection = ({ item }) => {
  const textareaRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [alert, setAlert] = useState(false);
  const handleComment = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please loggin to add comments");
      textareaRef.current.value = "";
      return;
    }
    try {
      const comment = textareaRef.current.value;
      if (comment === "") {
        toast.error("Please add comment in text area before posting");
        return;
      }
      console.log(item._id);
      const response = await axios.post(
        `http://localhost:5000/api/comment/${item._id}`,
        {
          userName: currentUser.userName,
          userImage: currentUser.image,
          comment,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response is", response);
      setAlert(!alert);
      textareaRef.current.value = "";
      toast.success("Comment posted");
    } catch (error) {
      toast.error("Comment could't be posted. Try again");
      console.log(error);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/comments/${item._id}`
        );
        console.log(res.data);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
    console.log(comments);
  }, [alert]);

  const autoResize = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <textarea
          ref={textareaRef}
          onInput={autoResize}
          name="comments"
          id="comments"
          placeholder="Add your review here"></textarea>
        <button type="submit">Post Comment</button>
      </form>

      {comments.map((comment) => (
        <div key={comment._id} className="user-comments">
          <div className="user">
            <img src={comment.userImage} alt="" />
          </div>
          <div className="comment-container">
            <p className="user-name">{comment.userName}</p>
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
      <ToastContainer autoClose={4000} />
    </div>
  );
};

export default CommentSection;
