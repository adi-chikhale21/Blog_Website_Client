import React, { useEffect, useState } from "react";
import "./EditPost.scss";
import Post from "../Post/Post";
import backgrounfImg from "../../assets/background-img.jpg";
import userImg from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  likeAndUnlikePost,
} from "../../Redux/Slices/postSlice";
import { getSinglePost, updatePost } from "../../Redux/Slices/singlePostSlice";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { setLoading } from "../../Redux/Slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { BsImages } from "react-icons/bs";

function EditPost() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const post = useSelector((state) => state.singlePostReducer.singlePost);
  const [title, setTitle] = useState("");
  const [postImg, setPostImg] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getSinglePost({ postId: params.postId }));
  }, []);

  useEffect(() => {
    if (myProfile?._id && post?.owner?._id) {
      setIsMyProfile(myProfile._id === post.owner._id);
    }
  }, [myProfile, post]);

  useEffect(() => {
    setTitle(post?.title || " ");
    setDescription(post?.description || "");
    setPostImg(post?.image?.url);
  }, [post]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === FileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }

  const handleEditBtn = async () => {
    try {
      await dispatch(
        updatePost({
          postId: post?._id,
          title,
          postImg,
          description,
        })
      ).unwrap();

      navigate(`/post/${post._id}`);
    } catch (error) {
      console.error("Failed to update post: ", error);
    }
  };

  return (
    <div className="EditPost">
      <div className="edit-header container">
        <div className="create-post-left-part">
          <div className="Title">
            <label htmlFor="edit-post-title" className="edit-post-label">
              Title
            </label>
            <input
              value={title}
              type="text"
              className="edit-post-title"
              id="edit-post-title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="edit-content">
            {postImg && (
              <div className="edit-img-container">
                <img className="edit-post-img" src={postImg} alt="post-img" />
              </div>
            )}
            <div className="edit-input-post-img">
              <label htmlFor="editinputImg" className="editlabelImg">
                <BsImages />
              </label>
              <input
                className="editinputImg"
                id="editinputImg"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <footer>
            <div className="edit-input-blog-container">
              <div className="edit-input-blog">
                <label className="edit-blog-label" htmlFor="edit-blog">
                  Edit Blog :{" "}
                </label>
                <textarea
                  value={description}
                  type="text"
                  id="edit-blog"
                  className="edit-blog-para"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                className="edit-post-btn primary-btn"
                onClick={handleEditBtn}
              >
                Edit Post
              </button>
            </div>
          </footer>
        </div>

        <div className="create-post-right-part">
          <div className="profile-card">
            <img
              className="User-Img"
              src={myProfile?.avatar?.url ? myProfile?.avatar?.url : userImg}
              alt="user-Img"
            />
            <h3 className="user-name">{myProfile?.name}</h3>
            <p>{myProfile?.bio}</p>

            <div className="follower-info">
              <h4>40 follower</h4>
              <h4>20 following</h4>
            </div>
            <button
              className="update-profile secondary-btn"
              onClick={() => navigate("/Updateprofile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
