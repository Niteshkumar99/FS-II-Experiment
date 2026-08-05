import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";

const Posts = () => {
  const { user } = useAuth();

  const {
    posts,
    addPost,
    updatePost,
    deletePost,
  } = usePosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  const canCreate =
    user?.role === "Admin" ||
    user?.role === "Editor";

  const canUpdate =
    user?.role === "Admin" ||
    user?.role === "Editor";

  const canDelete =
    user?.role === "Admin";

  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    if (editingId) {
      updatePost(
        editingId,
        title,
        content
      );

      alert("Post updated successfully");
    } else {
      addPost(
        title,
        content,
        user.username
      );

      alert("Post created successfully");
    }

    setTitle("");
    setContent("");
    setEditingId(null);
  };

  // EDIT
  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      deletePost(id);
    }
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="page">

      <div className="posts-header">
        <div>
          <h1>Posts Management</h1>

          <p>
            Logged in as:
            <strong> {user?.username}</strong>
            {" "}
            ({user?.role})
          </p>
        </div>
      </div>

      {/* CREATE / UPDATE FORM */}

      {canCreate && (
        <div className="post-form-card">

          <h2>
            {editingId
              ? "Update Post"
              : "Create New Post"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <label>
              Post Content
            </label>

            <textarea
              placeholder="Enter post content"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="5"
            />

            <div className="form-buttons">

              <button
                type="submit"
                className="action-btn"
              >
                {editingId
                  ? "Update Post"
                  : "Create Post"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </div>
      )}

      {/* POSTS */}

      <div className="posts-section">

        <h2>
          All Posts
        </h2>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="posts-grid">

            {posts.map((post) => (

              <div
                className="post-card"
                key={post.id}
              >

                <h2>
                  {post.title}
                </h2>

                <p className="post-content">
                  {post.content}
                </p>

                <p className="post-author">
                  Created by:
                  <strong> {post.author}</strong>
                </p>

                {/* UPDATE */}

                {canUpdate && (
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(post)
                    }
                  >
                    Update
                  </button>
                )}

                {/* DELETE */}

                {canDelete && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(post.id)
                    }
                  >
                    Delete
                  </button>
                )}

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Posts;