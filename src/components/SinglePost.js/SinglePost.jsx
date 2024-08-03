import React, { useEffect, useState } from "react";
import "./SinglePost.scss";
import Post from "../Post/Post";
import backgrounfImg from "../../assets/background-img.jpg";
import userImg from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  likeAndUnlikePost,
} from "../../Redux/Slices/postSlice";
import { addComment, getSinglePost } from "../../Redux/Slices/singlePostSlice";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { setLoading } from "../../Redux/Slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import Comments from "../Comments/Comments";

function SinglePost() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const post = useSelector((state) => state.singlePostReducer.singlePost);
  const [cmnt, setcmnt] = useState("");

  useEffect(() => {
    dispatch(getSinglePost({ postId: params.postId }));
  }, []);

  useEffect(() => {
    if (myProfile?._id && post?.owner?._id) {
      setIsMyProfile(myProfile._id === post.owner._id);
    }
  }, [myProfile, post]);

  function handleSinglePostLike() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }

  async function handleCommentBtn() {
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.post("/comment", {
        comment: cmnt,
        postId: post._id,
      });
      dispatch(getSinglePost({ postId: post._id }));
      console.log(response);
    } catch (e) {
      console.log(e, "this is error");
    } finally {
      dispatch(setLoading(false));
      setcmnt("");
    }
  }

  return (
    <div className="Profile">
      <div className="container">
        <div className="SinglePost-left-part">
          <div className="SinglePost-title">
            <h2>{post?.title}</h2>
          </div>
          <div className="SinglePost-img">
            <img src={post?.image?.url} alt="post-img" />
          </div>
          <div className="likesCount" onClick={handleSinglePostLike}>
            {post?.isLiked ? (
              <IoMdHeart style={{ color: "red" }} className="icon" />
            ) : (
              <IoIosHeartEmpty className="icon" />
            )}
            <h4 className="LikesCount-SinglePost">{post?.likesCount} likes</h4>
          </div>
          <div className="description">
            <p>{post?.description}</p>
          </div>

          <div className="Singlepost-buttons">
            <div>
              <button className="primary-btn">Edit</button>
            </div>
            <div className="SinglePost-deldiv">
              <button className="SinglePost-Delete primary-btn">Delete</button>
            </div>
          </div>
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img
              className="User-Img"
              src={
                post?.owner?.avatar?.url ? post?.owner?.avatar?.url : userImg
              }
              alt="user-Img"
            />
            <h3 className="user-name">{post?.owner?.name}</h3>

            <div className="follower-info">
              <h4>40 follower</h4>
              <h4>20 following</h4>
            </div>
            {!isMyProfile && (
              <button className="follow primary-btn">Follow</button>
            )}

            {isMyProfile && (
              <button
                className="update-profile secondary-btn"
                onClick={() => navigate("/Updateprofile")}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="comments container">
        <div>
          <div className="leftpart-comment">
            <h2>Comments Here</h2>
          </div>
          <div className="comment-box">
            <textarea
              value={cmnt}
              className="comment"
              onChange={(e) => {
                setcmnt(e.target.value);
              }}
            ></textarea>
            <button className="primary-btn cmt-btn" onClick={handleCommentBtn}>
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className="allComment container">
        {post.comments.map((comment) => (
          <Comments comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default SinglePost;
