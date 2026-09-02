import React from "react";
import {
  MemoDayCard,
  NormalDayCard,
} from "./DayCard";
import { useRenderCount } from "../utils/renderCounter";

function Calendar({
  days,
  postsByDate,
  reactMemoEnabled,
  onPostClick,
  onDelete,
  onDragStart,
  onDrop,
}) {
  const renders = useRenderCount("Calendar");

  const DayComponent = reactMemoEnabled
    ? MemoDayCard
    : NormalDayCard;

  return (
    <section className="calendar-section">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            CONTENT PLANNER
          </div>

          <h2>September 2026</h2>

          <p>
            Drag posts between days to reschedule
            your content.
          </p>
        </div>

        <div className="render-pill">
          <span className="live-dot" />
          Calendar renders: {renders}
        </div>
      </div>

      <div className="calendar-grid">
        {days.map((day) => (
          <DayComponent
            key={day.date}
            day={day}
            posts={postsByDate[day.date] || []}
            onPostClick={onPostClick}
            onDelete={onDelete}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </section>
  );
}

export default Calendar;