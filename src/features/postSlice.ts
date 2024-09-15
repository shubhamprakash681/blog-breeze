import { createSlice } from "@reduxjs/toolkit";
import { IPosts } from "../types/collections";

interface IPostsSlice {
  posts: IPosts[];
}

const initialState: IPostsSlice = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadAllPosts: (state, actions) => {
      state.posts = actions.payload;
    },
    updatePostById: (state, actions) => {
      const { id, postData } = actions.payload;

      state.posts = state.posts.map((post) => {
        if (post.slug === id) return postData;

        return post;
      });
    },
    deletePostById: (state, actions) => {
      const id = actions.payload;

      state.posts = state.posts.filter((post) => post.slug !== id);
    },
  },
});

export const { loadAllPosts, updatePostById, deletePostById } =
  postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;
