import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../types/collections";

interface IPostsSlice {
  recentPosts: IPost[];
}

const initialState: IPostsSlice = {
  recentPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadRecentPosts: (state, actions) => {
      state.recentPosts = actions.payload;
    },
  },
});

export const { loadRecentPosts } = postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;
