import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost } from "../features/postsSlice";

function PostList() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const startEdit = (post) => {
    setEditingId(post.id);
    setNewTitle(post.title);
  };

  const saveEdit = () => {
    if (newTitle.trim() === "") return;

    dispatch(
      editPost({
        id: editingId,
        title: newTitle,
      })
    );

    setEditingId(null);
    setNewTitle("");
  };

  return (
    <div className="card">
      <h2>All Posts</h2>

      {posts.length === 0 && (
        <p>No Posts Available</p>
      )}

      {posts.map((post) => (
        <div className="list-item" key={post.id}>
          {editingId === post.id ? (
            <>
              <input
                value={newTitle}
                onChange={(e) =>
                  setNewTitle(e.target.value)
                }
              />

              <button
                className="save-btn"
                onClick={saveEdit}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{post.title}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() => startEdit(post)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(deletePost(post.id))
                  }
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;