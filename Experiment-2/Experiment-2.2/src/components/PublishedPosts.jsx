import React from "react";
import { useSelector } from "react-redux";

import {
  selectPublishedPosts,
  selectTotalPosts,
  selectUnpublishedPosts,
} from "../features/selectors";

const PublishedPosts = () => {
  const publishedPosts = useSelector(selectPublishedPosts);
  const unpublishedPosts = useSelector(selectUnpublishedPosts);
  const totalPosts = useSelector(selectTotalPosts);

  return (
    <div className="section">
      <h2>🚀 Memoized Selectors</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <p>{totalPosts}</p>
        </div>

        <div className="stat-card">
          <h3>Published</h3>
          <p>{publishedPosts.length}</p>
        </div>

        <div className="stat-card">
          <h3>Unpublished</h3>
          <p>{unpublishedPosts.length}</p>
        </div>
      </div>

      <h2>✅ Published Posts</h2>

      <div className="published-list">
        {publishedPosts.map((post) => (
          <div className="published-item" key={post.id}>
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PublishedPosts);