import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/post/getpost", body);
      console.log("Single post ", response);
      return response.result.post;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const addComment = createAsyncThunk(
  "singlePost/addComment",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/comment", body);
      console.log(response.result.review);
      return response.result.review;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const singlePostSlice = createSlice({
  name: "singlePostSlice",
  initialState: {
    singlePost: {
      comments: [],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        state.singlePost = post;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.singlePost && Array.isArray(state.singlePost.comments)) {
          state.singlePost.comments.push(action.payload);
        } else {
          state.singlePost.comments = [action.payload];
        }
      });
  },
});

export default singlePostSlice.reducer;
