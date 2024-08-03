import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Redux/Slices/feedSlice";
import { getUserProfile } from "../../Redux/Slices/postSlice";
import { useParams } from "react-router-dom";

function Feed() {
  const allPosts = useSelector((state) => state.feedReducer.feedData);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="container">
        <div className="middle-part">
          {Array.isArray(allPosts) && allPosts.length > 0 ? (
            allPosts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
