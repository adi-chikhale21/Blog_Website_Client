import React from "react";
import Avatar from "../Avatar/Avatar";
import "./Post.scss";
import backgroundImg from "../../assets/background-img.jpg";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../Redux/Slices/postSlice";
import { getSinglePost } from "../../Redux/Slices/singlePostSlice";
import { showToast } from "../../Redux/Slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";

function Post({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLikeCLick() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "like or unlike",
      })
    );
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }

  function handleSinglePost() {
    dispatch(getSinglePost({ postId: post._id }));
    navigate(`/post/${post._id}`);
  }
  return (
    <div className="post">
      <div className="header">
        <div
          className="hover-link"
          onClick={() => navigate(`/profile/${post.owner._id}`)}
        >
          <Avatar src={post?.owner?.avatar?.url} />
        </div>
        <h3
          className="hover-link"
          onClick={() => navigate(`/profile/${post.owner._id}`)}
        >
          {post?.owner?.name}
        </h3>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="postimg" onClick={handleSinglePost} />
      </div>
      <div className="footer">
        <div className="like" onClick={handleLikeCLick}>
          {post.isLiked ? (
            <IoMdHeart style={{ color: "red" }} className="icon" />
          ) : (
            <IoIosHeartEmpty className="icon" />
          )}
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <h4 className="caption" onClick={handleSinglePost}>
          {post?.title}
        </h4>
        <h6 className="time-ago">{post?.timeAgo}</h6>
      </div>
    </div>
  );
}

export default Post;
