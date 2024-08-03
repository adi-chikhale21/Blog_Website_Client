import React, { useState } from "react";
import "./CreatePost.scss";
import userImg from "../../assets/user.png";
import { useNavigate } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import backgroundDummyImg from "../../assets/background-img.jpg";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Redux/Slices/appConfigSlice";
import { getUserProfile } from "../../Redux/Slices/postSlice";

function CreatePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postImg, setPostImg] = useState("");
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

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

  const handleSubmitPost = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.post("/post", {
        title,
        description,
        postImg,
      });
      dispatch(
        getUserProfile({
          userId: myProfile?._id,
        })
      );
      navigate(`/`);
    } catch (e) {
      console.log(e, "this is error");
    } finally {
      dispatch(setLoading(false));
      setTitle("");
      setDescription("");
      setPostImg("");
    }
  };

  return (
    <div className="createPost">
      <div className="header container">
        <div className="create-post-left-part">
          <div className="Title">
            <label htmlFor="create-post-title" className="create-post-label">
              Title
            </label>
            <input
              value={title}
              type="text"
              className="create-post-title"
              id="create-post-title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="content">
            {postImg && (
              <div className="img-container">
                <img className="post-img" src={postImg} alt="post-img" />
              </div>
            )}
            <div className="input-post-img">
              <label htmlFor="inputImg" className="labelImg">
                <BsImages />
              </label>
              <input
                className="inputImg"
                id="inputImg"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <footer>
            <div className="input-blog-container">
              <div className="input-blog">
                <label className="blog-label" htmlFor="blog">
                  Start Writing Blog:{" "}
                </label>
                <textarea
                  value={description}
                  type="text"
                  id="blog"
                  className="blog-para"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                className="create-post-btn primary-btn"
                onClick={handleSubmitPost}
              >
                Create a Post
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

export default CreatePost;
