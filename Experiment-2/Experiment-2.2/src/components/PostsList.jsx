import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePublished } from "../features/postsSlice";

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  return (
    <div className="section">
      <h2>📚 All Posts</h2>

      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div>
            <h3 className="post-title">{post.title}</h3>

            <p
              className={
                post.published
                  ? "status published"
                  : "status unpublished"
              }
            >
              {post.published ? "Published ✅" : "Unpublished ❌"}
            </p>
          </div>

          <button onClick={() => dispatch(togglePublished(post.id))}>
            Toggle Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(PostsList);