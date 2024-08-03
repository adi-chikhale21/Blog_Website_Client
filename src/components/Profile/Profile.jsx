import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Post from "../Post/Post";
import userImg from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../Redux/Slices/postSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );

    setIsMyProfile(myProfile?._id === params.userId);
  }, [myProfile]);

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img
              className="User-Img"
              src={
                userProfile?.avatar?.url ? userProfile?.avatar?.url : userImg
              }
              alt="user-Img"
            />
            <h3 className="user-name">{userProfile?.name}</h3>
            <p>{userProfile?.bio}</p>

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
    </div>
  );
}

export default Profile;
