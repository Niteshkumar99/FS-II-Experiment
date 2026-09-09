import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";
import platformReducer from "../features/platformSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformReducer,
  },
});