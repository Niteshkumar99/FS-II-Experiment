import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

const initialPosts = [
  {
    id: 1,
    title: "Introduction to JWT",
    content:
      "JWT is used for secure token-based authentication in web applications.",
    author: "Nitesh",
  },
  {
    id: 2,
    title: "Role Based Access Control",
    content:
      "RBAC allows applications to control access according to user roles.",
    author: "Nitesh",
  },
];

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");

    return savedPosts
      ? JSON.parse(savedPosts)
      : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // CREATE
  const addPost = (title, content, author) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author,
    };

    setPosts((previousPosts) => [
      ...previousPosts,
      newPost,
    ]);
  };

  // UPDATE
  const updatePost = (id, title, content) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              title,
              content,
            }
          : post
      )
    );
  };

  // DELETE
  const deletePost = (id) => {
    setPosts((previousPosts) =>
      previousPosts.filter((post) => post.id !== id)
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};