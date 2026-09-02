import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";
import PostModal from "./components/PostModal";

import { initialPosts } from "./data/posts";
import { createDays } from "./utils/dateUtils";
import {
  getRenderStats,
  resetRenderStats,
  useRenderCount,
} from "./utils/renderCounter";

const DAYS = createDays();

function App() {
  const appRenders = useRenderCount("App");

  const [posts, setPosts] =
    useState(initialPosts);

  const [reactMemoEnabled, setReactMemoEnabled] =
    useState(true);

  const [
    useCallbackEnabled,
    setUseCallbackEnabled,
  ] = useState(true);

  const [useMemoEnabled, setUseMemoEnabled] =
    useState(true);

  const [clockEnabled, setClockEnabled] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [filter, setFilter] =
    useState("All");

  const [selectedPost, setSelectedPost] =
    useState(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [monitorTick, setMonitorTick] =
    useState(0);

  const draggedPostId = useRef(null);

  /*
   * LIVE CLOCK
   *
   * This is deliberately unrelated to the
   * calendar.
   *
   * It forces App to render repeatedly.
   */

  useEffect(() => {
    if (!clockEnabled) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setMonitorTick(
        (value) => value + 1
      );
    }, 500);

    return () => clearInterval(timer);
  }, [clockEnabled]);

  /*
   * useMemo #1
   *
   * Group posts by date.
   *
   * Clock changes do NOT change posts.
   * Therefore this calculation is reused.
   */

  const postsByDate = useMemo(() => {
    const grouped = {};

    DAYS.forEach((day) => {
      grouped[day.date] = [];
    });

    posts.forEach((post) => {
      if (!grouped[post.date]) {
        grouped[post.date] = [];
      }

      grouped[post.date].push(post);
    });

    return grouped;
  }, [posts]);

  /*
   * useMemo #2
   *
   * Filter calculation.
   */

  const memoizedFilteredPosts = useMemo(() => {
    if (filter === "All") {
      return posts;
    }

    return posts.filter(
      (post) => post.platform === filter
    );
  }, [posts, filter]);

  /*
   * Normal calculation.
   *
   * This intentionally executes on every App render.
   */

  const normalFilteredPosts =
    filter === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.platform === filter
        );

  const filteredPosts = useMemoEnabled
    ? memoizedFilteredPosts
    : normalFilteredPosts;

  /*
   * useCallback handlers
   */

  const memoizedPostClick = useCallback(
    (post) => {
      setSelectedPost(post);
      setModalOpen(true);
    },
    []
  );

  const memoizedDelete = useCallback(
    (postId) => {
      setPosts((currentPosts) =>
        currentPosts.filter(
          (post) => post.id !== postId
        )
      );
    },
    []
  );

  const memoizedDragStart = useCallback(
    (event, postId) => {
      draggedPostId.current = postId;

      event.dataTransfer.effectAllowed =
        "move";

      event.dataTransfer.setData(
        "text/plain",
        String(postId)
      );
    },
    []
  );

  const memoizedDrop = useCallback(
    (event, newDate) => {
      event.preventDefault();

      const id =
        event.dataTransfer.getData(
          "text/plain"
        ) || draggedPostId.current;

      if (!id) {
        return;
      }

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          String(post.id) === String(id)
            ? {
                ...post,
                date: newDate,
              }
            : post
        )
      );

      draggedPostId.current = null;
    },
    []
  );

  const memoizedSave = useCallback(
    (postData) => {
      setPosts((currentPosts) => {
        if (postData.id) {
          return currentPosts.map(
            (post) =>
              post.id === postData.id
                ? {
                    ...post,
                    ...postData,
                  }
                : post
          );
        }

        return [
          ...currentPosts,
          {
            ...postData,
            id: Date.now(),
          },
        ];
      });

      setModalOpen(false);
      setSelectedPost(null);
    },
    []
  );

  /*
   * useCallback OFF
   *
   * New function references are intentionally
   * created every time App renders.
   *
   * This allows us to demonstrate why
   * useCallback matters.
   */

  const onPostClick = useCallbackEnabled
    ? memoizedPostClick
    : (post) => {
        setSelectedPost(post);
        setModalOpen(true);
      };

  const onDelete = useCallbackEnabled
    ? memoizedDelete
    : (postId) => {
        setPosts((currentPosts) =>
          currentPosts.filter(
            (post) => post.id !== postId
          )
        );
      };

  const onDragStart = useCallbackEnabled
    ? memoizedDragStart
    : (event, postId) => {
        draggedPostId.current = postId;

        event.dataTransfer.effectAllowed =
          "move";

        event.dataTransfer.setData(
          "text/plain",
          String(postId)
        );
      };

  const onDrop = useCallbackEnabled
    ? memoizedDrop
    : (event, newDate) => {
        event.preventDefault();

        const id =
          event.dataTransfer.getData(
            "text/plain"
          ) || draggedPostId.current;

        if (!id) {
          return;
        }

        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            String(post.id) === String(id)
              ? {
                  ...post,
                  date: newDate,
                }
              : post
          )
        );

        draggedPostId.current = null;
      };

  const onSave = useCallbackEnabled
    ? memoizedSave
    : (postData) => {
        setPosts((currentPosts) => {
          if (postData.id) {
            return currentPosts.map(
              (post) =>
                post.id === postData.id
                  ? {
                      ...post,
                      ...postData,
                    }
                  : post
            );
          }

          return [
            ...currentPosts,
            {
              ...postData,
              id: Date.now(),
            },
          ];
        });

        setModalOpen(false);
        setSelectedPost(null);
      };

  /*
   * Reset application.
   */

  function resetApplication() {
    resetRenderStats();

    setPosts(initialPosts);
    setFilter("All");
    setClockEnabled(false);
    setCurrentTime(new Date());
    setModalOpen(false);
    setSelectedPost(null);
    setMonitorTick(
      (value) => value + 1
    );
  }

  const renderStats = getRenderStats();

  const totalTrackedRenders =
    Object.values(renderStats).reduce(
      (sum, value) => sum + value,
      0
    );

  return (
    <div className="app">

      {/* HEADER */}

      <header className="top-header">
        <div className="brand-area">
          <div className="brand-icon">
            ✦
          </div>

          <div>
            <div className="eyebrow">
              EXPERIMENT 04
            </div>

            <h1>
              Interactive Content Calendar
            </h1>

            <p>
              Explore React rendering performance
              in real time.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="app-render-pill">
            App renders:{" "}
            <strong>{appRenders}</strong>
          </div>

          <button
            className="secondary-button"
            onClick={resetApplication}
          >
            Reset
          </button>

          <button
            className="primary-button"
            onClick={() => {
              setSelectedPost(null);
              setModalOpen(true);
            }}
          >
            + New Post
          </button>
        </div>
      </header>


      {/* PERFORMANCE CONTROLS */}

      <section className="control-panel">

        <div className="control-panel-heading">
          <div>
            <div className="eyebrow">
              PERFORMANCE LAB
            </div>

            <h2>
              Toggle optimizations
            </h2>
          </div>

          <div className="experiment-badge">
            LIVE EXPERIMENT
          </div>
        </div>

        <div className="controls-grid">

          <Control
            enabled={reactMemoEnabled}
            onClick={() =>
              setReactMemoEnabled(
                (value) => !value
              )
            }
            title="React.memo"
            description="Skip cards whose props have not changed."
          />

          <Control
            enabled={useCallbackEnabled}
            onClick={() =>
              setUseCallbackEnabled(
                (value) => !value
              )
            }
            title="useCallback"
            description="Keep handler references stable."
          />

          <Control
            enabled={useMemoEnabled}
            onClick={() =>
              setUseMemoEnabled(
                (value) => !value
              )
            }
            title="useMemo"
            description="Cache the filtered agenda calculation."
          />

          <Control
            enabled={clockEnabled}
            onClick={() =>
              setClockEnabled(
                (value) => !value
              )
            }
            title="Live Clock"
            description="Creates unrelated state updates every 500ms."
            extra={
              <div className="live-clock">
                {currentTime.toLocaleTimeString()}
              </div>
            }
          />

        </div>
      </section>


      {/* EXPLANATION BANNER */}

      <section className="experiment-banner">
        <div className="banner-icon">
          ⚡
        </div>

        <div>
          <strong>
            Try the experiment
          </strong>

          <p>
            Turn on Live Clock and watch the
            DayCard counters. Then switch
            React.memo OFF and compare the
            difference.
          </p>
        </div>

        <div className="banner-result">
          <span>Total renders</span>
          <strong>
            {totalTrackedRenders}
          </strong>
        </div>
      </section>


      {/* FILTER */}

      <section className="filter-bar">
        <div>
          <div className="eyebrow">
            AGENDA FILTER
          </div>

          <h3>
            Filter your content
          </h3>
        </div>

        <div className="filter-right">
          <span>
            {filteredPosts.length} posts
          </span>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="All">
              All Platforms
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="YouTube">
              YouTube
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="X">
              X
            </option>

            <option value="Facebook">
              Facebook
            </option>
          </select>
        </div>
      </section>


      {/* STATISTICS */}

      <Statistics
        posts={posts}
        filter={filter}
        filteredPosts={filteredPosts}
        reactMemoEnabled={
          reactMemoEnabled
        }
        useCallbackEnabled={
          useCallbackEnabled
        }
        useMemoEnabled={
          useMemoEnabled
        }
      />


      {/* CALENDAR */}

      <Calendar
        days={DAYS}
        postsByDate={postsByDate}
        reactMemoEnabled={
          reactMemoEnabled
        }
        onPostClick={onPostClick}
        onDelete={onDelete}
        onDragStart={onDragStart}
        onDrop={onDrop}
      />


      {/* RENDER MONITOR */}

      <section className="monitor-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              COMPONENT TELEMETRY
            </div>

            <h2>
              Render activity
            </h2>

            <p>
              A live view of component rendering.
            </p>
          </div>

          <span className="monitor-live">
            ● LIVE
          </span>
        </div>

        <div className="monitor-grid">
          <RenderRow
            name="App"
            value={renderStats.App}
            max={Math.max(
              renderStats.App,
              1
            )}
          />

          <RenderRow
            name="Calendar"
            value={renderStats.Calendar}
            max={Math.max(
              renderStats.Calendar,
              1
            )}
          />

          <RenderRow
            name="DayCard"
            value={renderStats.DayCard}
            max={Math.max(
              renderStats.DayCard,
              30
            )}
          />

          <RenderRow
            name="PostCard"
            value={renderStats.PostCard}
            max={Math.max(
              renderStats.PostCard,
              30
            )}
          />

          <RenderRow
            name="Statistics"
            value={renderStats.Statistics}
            max={Math.max(
              renderStats.Statistics,
              1
            )}
          />
        </div>

        <div className="monitor-note">
          <span>ⓘ</span>

          <p>
            Live Clock changes only unrelated
            state. With React.memo and stable
            callbacks enabled, DayCards can skip
            unnecessary renders.
          </p>
        </div>
      </section>


      {/* HOW IT WORKS */}

      <section className="how-section">
        <div className="eyebrow">
          UNDERSTANDING THE EXPERIMENT
        </div>

        <h2>
          What each optimization does
        </h2>

        <div className="concept-grid">

          <Concept
            number="01"
            title="React.memo"
            text="Prevents a child from rendering when its incoming props are unchanged."
          />

          <Concept
            number="02"
            title="useCallback"
            text="Keeps callback function references stable so memoized children can actually skip renders."
          />

          <Concept
            number="03"
            title="useMemo"
            text="Caches an expensive calculation and reuses its previous result until dependencies change."
          />

          <Concept
            number="04"
            title="Live Clock"
            text="Creates unrelated state updates so unnecessary child rendering can be observed."
          />

        </div>
      </section>


      {/* MODAL */}

      {modalOpen && (
        <PostModal
          post={selectedPost}
          onSave={onSave}
          onClose={() => {
            setModalOpen(false);
            setSelectedPost(null);
          }}
        />
      )}

    </div>
  );
}


/* -------------------------------- */
/* CONTROL COMPONENT                */
/* -------------------------------- */

function Control({
  enabled,
  onClick,
  title,
  description,
  extra,
}) {
  return (
    <div className="control-item">
      <button
        className={
          enabled
            ? "toggle active"
            : "toggle"
        }
        onClick={onClick}
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>

      <div className="control-content">
        <div className="control-title">
          {title}

          <span
            className={
              enabled
                ? "on-label"
                : "off-label"
            }
          >
            {enabled ? "ON" : "OFF"}
          </span>
        </div>

        <p>{description}</p>

        {extra}
      </div>
    </div>
  );
}


/* -------------------------------- */
/* RENDER ROW                       */
/* -------------------------------- */

function RenderRow({
  name,
  value,
  max,
}) {
  const percentage =
    Math.min(
      (value / max) * 100,
      100
    );

  return (
    <div className="render-row">
      <div className="render-row-top">
        <span>{name}</span>

        <strong>{value}</strong>
      </div>

      <div className="render-bar">
        <div
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}


/* -------------------------------- */
/* CONCEPT CARD                     */
/* -------------------------------- */

function Concept({
  number,
  title,
  text,
}) {
  return (
    <div className="concept-card">
      <div className="concept-number">
        {number}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

export default App;