import { useRef } from "react";

const renderStats = {
  App: 0,
  Calendar: 0,
  DayCard: 0,
  PostCard: 0,
  Statistics: 0,
};

export function useRenderCount(componentName) {
  const count = useRef(0);

  count.current += 1;

  renderStats[componentName] =
    (renderStats[componentName] || 0) + 1;

  return count.current;
}

export function getRenderStats() {
  return {
    ...renderStats,
  };
}

export function resetRenderStats() {
  Object.keys(renderStats).forEach((key) => {
    renderStats[key] = 0;
  });
}