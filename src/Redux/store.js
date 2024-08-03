import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./Slices/appConfigSlice";
import postReducer from "./Slices/postSlice";
import feedReducer from "./Slices/feedSlice";
import singlePostReducer from "./Slices/singlePostSlice";

export default configureStore({
  reducer: {
    appConfigReducer,
    postReducer,
    feedReducer,
    singlePostReducer,
  },
});
