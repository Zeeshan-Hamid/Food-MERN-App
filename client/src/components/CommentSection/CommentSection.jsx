import { useRef } from "react";
import "./commentSections.scss";

const CommentSection = () => {
    const textareaRef = useRef(null);

    const autoResize = () => {
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`; 
    };
    return (
      <div className="comment-section">
        <h2>Comments</h2>
        <textarea
          ref={textareaRef}
          onInput={autoResize}
          name="comments"
          id="comments"
          placeholder="Add your review here"></textarea>
      </div>
    );
};

export default CommentSection;
