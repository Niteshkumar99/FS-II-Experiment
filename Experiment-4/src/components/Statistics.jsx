import React, { memo } from "react";
import { useRenderCount } from "../utils/renderCounter";

function Statistics({
  posts,
  filter,
  filteredPosts,
  reactMemoEnabled,
  useCallbackEnabled,
  useMemoEnabled,
}) {
  const renders = useRenderCount(
    "Statistics"
  );

  const scheduled = posts.filter(
    (post) => post.status === "Scheduled"
  ).length;

  const published = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const drafts = posts.filter(
    (post) => post.status === "Draft"
  ).length;

  return (
    <section className="statistics-section">
      <div className="statistics-header">
        <div>
          <div className="eyebrow">
            PERFORMANCE
          </div>

          <h2>Render Monitor</h2>

          <p>
            Watch how unrelated state updates
            affect the calendar.
          </p>
        </div>

        <div className="stats-render-number">
          <span>STATS RENDERS</span>
          <strong>{renders}</strong>
        </div>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <span>Total Posts</span>
          <strong>{posts.length}</strong>
        </div>

        <div className="stat-card">
          <span>Published</span>
          <strong>{published}</strong>
        </div>

        <div className="stat-card">
          <span>Scheduled</span>
          <strong>{scheduled}</strong>
        </div>

        <div className="stat-card">
          <span>Drafts</span>
          <strong>{drafts}</strong>
        </div>

        <div className="stat-card">
          <span>Filtered</span>
          <strong>
            {filteredPosts.length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Filter</span>
          <strong>{filter}</strong>
        </div>
      </div>

      <div className="optimization-status">
        <div
          className={
            reactMemoEnabled
              ? "status-chip enabled"
              : "status-chip disabled"
          }
        >
          <span />
          React.memo{" "}
          {reactMemoEnabled ? "ON" : "OFF"}
        </div>

        <div
          className={
            useCallbackEnabled
              ? "status-chip enabled"
              : "status-chip disabled"
          }
        >
          <span />
          useCallback{" "}
          {useCallbackEnabled ? "ON" : "OFF"}
        </div>

        <div
          className={
            useMemoEnabled
              ? "status-chip enabled"
              : "status-chip disabled"
          }
        >
          <span />
          useMemo{" "}
          {useMemoEnabled ? "ON" : "OFF"}
        </div>
      </div>
    </section>
  );
}

export default memo(Statistics);