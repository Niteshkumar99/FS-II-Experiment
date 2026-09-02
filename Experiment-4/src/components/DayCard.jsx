import React, { memo } from "react";
import PostCard from "./PostCard";
import { useRenderCount } from "../utils/renderCounter";

function DayCard({
  day,
  posts,
  onPostClick,
  onDelete,
  onDragStart,
  onDrop,
}) {
  const renders = useRenderCount("DayCard");

  return (
    <div
      className="day-card"
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDrop={(event) =>
        onDrop(event, day.date)
      }
    >
      <div className="day-card-header">
        <div>
          <span className="weekday">
            {day.weekday}
          </span>

          <strong>{day.day}</strong>
        </div>

        <span className="day-count">
          {posts.length}
        </span>
      </div>

      <div className="day-posts">
        {posts.length === 0 ? (
          <div className="empty-day">
            Drop a post here
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={onPostClick}
              onDelete={onDelete}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>

      <div className="day-render">
        Day renders: {renders}
      </div>
    </div>
  );
}

export const MemoDayCard = memo(DayCard);

export const NormalDayCard = DayCard;