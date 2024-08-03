import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../Redux/Slices/appConfigSlice";
import { getAllPosts } from "../../Redux/Slices/feedSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo());
    dispatch(getAllPosts());
    console.log("Dispatch all things");
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
