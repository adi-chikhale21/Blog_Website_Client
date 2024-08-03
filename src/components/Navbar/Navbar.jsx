import React, { useRef, useState } from "react";
import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Redux/Slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  async function handlelogout() {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {}
  }

  return (
    <div className="Navbar">
      <div className="container">
        <div className="left-part-nav">
          <h1
            className="banner hover-link"
            onClick={() => {
              navigate("/");
            }}
          >
            Blog
          </h1>

          {location.pathname !== "/createpost" && (
            <h3
              className="create-post-nav"
              onClick={() => {
                navigate("/createpost");
              }}
            >
              Create a post
            </h3>
          )}
        </div>

        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handlelogout}>
            <IoMdLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
