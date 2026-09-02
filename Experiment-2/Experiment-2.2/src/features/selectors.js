import { createSelector } from "@reduxjs/toolkit";

// Basic Selector
export const selectPosts = (state) => state.posts.posts;

// Memoized Selector
export const selectPublishedPosts = createSelector(
  [selectPosts],
  (posts) => {
    console.log("Filtering Published Posts...");

    return posts.filter((post) => post.published);
  }
);

// Memoized Selector for Total Posts
export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

// Memoized Selector for Unpublished Posts
export const selectUnpublishedPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => !post.published)
);