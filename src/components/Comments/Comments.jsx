import React from "react";
import "./Comments.scss";

function Comments({ comment }) {
  return (
    <div key={comment._id} className="comments-box">
      <div>
        <h5 className="owner-comment">{comment.owner.name}</h5>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comments;
