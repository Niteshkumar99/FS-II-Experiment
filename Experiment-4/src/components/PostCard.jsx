import React, { memo } from "react";
import { formatDate } from "../utils/dateUtils";
import { useRenderCount } from "../utils/renderCounter";

function PostCard({
  post,
  onClick,
  onDelete,
  onDragStart,
}) {
  const renders = useRenderCount("PostCard");

  return (
    <div
      className="post-card"
      draggable
      onDragStart={(event) =>
        onDragStart(event, post.id)
      }
      onClick={() => onClick(post)}
    >
      <div className="post-card-top">
        <span className="platform">
          {post.platform}
        </span>

        <span
          className={`status ${post.status.toLowerCase()}`}
        >
          {post.status}
        </span>
      </div>

      <h4>{post.title}</h4>

      <div className="post-card-bottom">
        <span>{formatDate(post.date)}</span>

        <button
          className="delete-button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(post.id);
          }}
        >
          ×
        </button>
      </div>

      <div className="mini-render">
        render #{renders}
      </div>
    </div>
  );
}

export default memo(PostCard);