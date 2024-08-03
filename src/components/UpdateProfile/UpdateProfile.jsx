import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import userImg from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../assets/user.png";
import { updateMyProfile } from "../../Redux/Slices/appConfigSlice";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setName(myProfile?.name || " ");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || userImage);
  }, [myProfile]);

  function handleChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === FileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );

    console.log(name, bio);
  }

  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              className="name"
              value={name}
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="Bio"
              value={bio}
              type="text"
              placeholder="Your Bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="submit"
              className="primary-btn"
              onSubmit={handleSubmit}
            />
          </form>
          <button className="DeleteAccount primary-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
