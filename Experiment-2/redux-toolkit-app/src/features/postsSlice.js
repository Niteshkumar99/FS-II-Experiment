import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // Add Post
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    // Delete Post
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    // Edit Post
    editPost: (state, action) => {
      const { id, title } = action.payload;

      const post = state.posts.find(
        (post) => post.id === id
      );

      if (post) {
        post.title = title;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  editPost,
} = postsSlice.actions;

export default postsSlice.reducer;