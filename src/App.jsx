import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import RequireUser from "./components/RequireUser";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import CreatePost from "./components/createPost/CreatePost";
import UserIfNotLoggedIn from "./components/UserIfNotLoggedIn";
import SinglePost from "./components/SinglePost.js/SinglePost";
import toast, { Toaster } from "react-hot-toast";
import EditPost from "./components/EditPost/EditPost";

export const TOAST_SUCCESS = "toast_success";
export const TOAST_FAILURE = "toast_failure";

function App() {
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);
  const toastData = useSelector((state) => state.appConfigReducer.toastData);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message);
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

  return (
    <div className="App">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/Updateprofile" element={<UpdateProfile />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:postId" element={<SinglePost />} />
            <Route path="/post/:postId/edit" element={<EditPost />} />
          </Route>
        </Route>
        <Route element={<UserIfNotLoggedIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
