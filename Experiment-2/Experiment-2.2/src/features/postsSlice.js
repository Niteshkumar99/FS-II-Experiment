import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learn React",
      published: true,
    },
    {
      id: 2,
      title: "Learn Redux Toolkit",
      published: false,
    },
    {
      id: 3,
      title: "Learn JavaScript",
      published: true,
    },
    {
      id: 4,
      title: "Build Projects",
      published: false,
    },
    {
      id: 5,
      title: "Practice DSA",
      published: true,
    },
    {
      id: 6,
      title: "Learn Memoized Selectors",
      published: false,
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    togglePublished: (state, action) => {
      const post = state.posts.find(
        (item) => item.id === action.payload
      );

      if (post) {
        post.published = !post.published;
      }
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const {
  togglePublished,
  addPost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;