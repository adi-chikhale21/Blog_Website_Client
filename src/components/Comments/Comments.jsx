import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Comments.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

function Comments({ comment, onDelete }) {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  let [isMyComment, setIsMyComment] = useState(true);

  useEffect(() => {
    if (myProfile?._id && comment?.owner?._id) {
      setIsMyComment(myProfile._id === comment.owner._id);
    }
  }, [myProfile, comment]);

  async function handleDeleteComment() {
    try {
      const response = await axiosClient.delete("/comment", {
        data: {
          commentId: comment._id,
          postId: comment.post,
        },
      });

      if (response.statusCode === 200) {
        onDelete();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div key={comment._id} className="comments-box">
      <div>
        <h5 className="owner-comment">{comment.owner.name}</h5>
        <p className="comment-msg">{comment.comment}</p>
        {isMyComment ? (
          <button
            className="primary-btn delete-btn"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Comments;
