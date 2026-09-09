import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postsSlice";

function AddPost() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim() === "") {
      alert("Please enter a post title!");
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title,
      })
    );

    setTitle("");
  };

  return (
    <div className="card">
      <h2>Add New Post</h2>

      <input
        type="text"
        placeholder="Enter Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="add-btn" onClick={handleAdd}>
        Add Post
      </button>
    </div>
  );
}

export default AddPost;