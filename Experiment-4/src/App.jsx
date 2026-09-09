import {
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";

import "./App.css";

/* =====================================================
   INITIAL POSTS
===================================================== */

const initialPosts = [
  {
    id: 1,
    title: "Instagram Campaign",
    platform: "Instagram",
    date: "2026-09-08",
    time: "10:00",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "LinkedIn Product Post",
    platform: "LinkedIn",
    date: "2026-09-10",
    time: "14:00",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Twitter Announcement",
    platform: "Twitter",
    date: "2026-09-12",
    time: "18:00",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Weekend Promotion",
    platform: "Instagram",
    date: "2026-09-13",
    time: "12:00",
    status: "Scheduled",
  },
];


/* =====================================================
   DATE UTILITIES
===================================================== */

function formatDate(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function getWeekDays(date) {
  const current = new Date(date);

  const day = current.getDay();

  current.setDate(
    current.getDate() - day
  );

  const days = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(current);

    newDate.setDate(
      current.getDate() + i
    );

    days.push(newDate);
  }

  return days;
}


/* =====================================================
   OPTIMIZED POST CARD
===================================================== */

const PostCard = memo(
  function PostCard({
    post,
    onEdit,
    onDelete,
    onDragStart,
  }) {

    return (
      <div
        className="post-card"
        draggable
        onDragStart={(event) =>
          onDragStart(event, post.id)
        }
      >

        <div className="post-platform">
          {post.platform}
        </div>

        <div className="post-title">
          {post.title}
        </div>

        <div className="post-time">
          🕐 {post.time}
        </div>

        <div className="post-actions">

          <button
            className="edit-btn"
            onClick={() => onEdit(post)}
          >
            ✏️
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              onDelete(post.id)
            }
          >
            🗑️
          </button>

        </div>

      </div>
    );
  }
);


/* =====================================================
   CALENDAR DAY
===================================================== */

const CalendarDay = memo(
  function CalendarDay({
    date,
    posts,
    onEdit,
    onDelete,
    onDrop,
    onDragStart,
    isToday,
  }) {

    const dateString = formatDate(date);

    const dayPosts = useMemo(() => {
      return posts.filter(
        (post) =>
          post.date === dateString
      );
    }, [posts, dateString]);


    const handleDrop = useCallback(
      (event) => {
        event.preventDefault();

        const postId =
          event.dataTransfer.getData(
            "postId"
          );

        if (postId) {
          onDrop(
            Number(postId),
            dateString
          );
        }
      },
      [onDrop, dateString]
    );


    const handleDragOver = useCallback(
      (event) => {
        event.preventDefault();
      },
      []
    );


    return (
      <div
        className={`calendar-day ${
          isToday ? "today" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >

        <div className="day-number">
          {date.getDate()}
        </div>

        <div className="day-posts">

          {dayPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
            />
          ))}

        </div>

      </div>
    );
  }
);


/* =====================================================
   MAIN APP
===================================================== */

function App() {

  /* ---------------------------------------------------
     STATE
  --------------------------------------------------- */

  const [posts, setPosts] =
    useState(initialPosts);

  const [currentDate] =
    useState(new Date(2026, 8, 8));

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingPost, setEditingPost] =
    useState(null);

  const [form, setForm] =
    useState({
      title: "",
      platform: "Instagram",
      date: "2026-09-08",
      time: "10:00",
    });


  /* ---------------------------------------------------
     PERFORMANCE DEMO STATE
  --------------------------------------------------- */

  const [nonOptimizedCount, setNonOptimizedCount] =
    useState(0);

  const [optimizedCount, setOptimizedCount] =
    useState(0);

  const [optimizedMode, setOptimizedMode] =
    useState(true);

  const [nonOptimizedMode, setNonOptimizedMode] =
    useState(true);

  /* ---------------------------------------------------
     FILTER POSTS
  --------------------------------------------------- */

  const filteredPosts = useMemo(() => {

    if (!search.trim()) {
      return posts;
    }

    return posts.filter((post) =>
      post.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  }, [posts, search]);


  /* ---------------------------------------------------
     WEEK DAYS
  --------------------------------------------------- */

  const weekDays = useMemo(() => {

    return getWeekDays(
      currentDate
    );

  }, [currentDate]);


  /* ---------------------------------------------------
     TODAY
  --------------------------------------------------- */

  const today = new Date();

  const todayString =
    formatDate(today);


  /* ---------------------------------------------------
     NAVIGATION
  --------------------------------------------------- */

  /* ---------------------------------------------------
     DRAG START
  --------------------------------------------------- */

  const handleDragStart = useCallback(
    (event, postId) => {

      event.dataTransfer.setData(
        "postId",
        postId
      );

    },
    []
  );


  /* ---------------------------------------------------
     DROP POST
  --------------------------------------------------- */

  const handleDrop = useCallback(
    (postId, newDate) => {

      const movedPost = posts.find(
        (post) => post.id === postId
      );

      if (!movedPost || movedPost.date === newDate) {
        return;
      }

      setPosts((previousPosts) =>
        previousPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                date: newDate,
              }
            : post
        )
      );

      if (nonOptimizedMode) {
        setNonOptimizedCount(
          (previous) => previous + 7
        );
      }

      if (optimizedMode) {
        setOptimizedCount(
          (previous) => previous + 1
        );
      }

    },
    [posts, nonOptimizedMode, optimizedMode]
  );


  /* ---------------------------------------------------
     DELETE POST
  --------------------------------------------------- */

  const handleDelete = useCallback(
    (id) => {

      setPosts((previousPosts) =>
        previousPosts.filter(
          (post) =>
            post.id !== id
        )
      );

    },
    []
  );


  /* ---------------------------------------------------
     OPEN ADD MODAL
  --------------------------------------------------- */

  const openAddModal = () => {

    setEditingPost(null);

    setForm({
      title: "",
      platform: "Instagram",
      date: formatDate(
        currentDate
      ),
      time: "10:00",
    });

    setShowModal(true);
  };


  /* ---------------------------------------------------
     OPEN EDIT MODAL
  --------------------------------------------------- */

  const openEditModal = useCallback(
    (post) => {

      setEditingPost(post);

      setForm({
        title: post.title,
        platform: post.platform,
        date: post.date,
        time: post.time,
      });

      setShowModal(true);

    },
    []
  );


  /* ---------------------------------------------------
     SAVE POST
  --------------------------------------------------- */

  const savePost = (event) => {

    event.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter post title.");
      return;
    }


    if (editingPost) {

      setPosts((previousPosts) =>
        previousPosts.map(
          (post) =>
            post.id ===
            editingPost.id
              ? {
                  ...post,
                  ...form,
                }
              : post
        )
      );

    } else {

      const newPost = {
        id: Date.now(),
        ...form,
        status: "Scheduled",
      };

      setPosts(
        (previousPosts) => [
          ...previousPosts,
          newPost,
        ]
      );
    }


    setShowModal(false);

    setEditingPost(null);
  };


  /* ---------------------------------------------------
     FORM INPUT
  --------------------------------------------------- */

  const handleInputChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  /* ---------------------------------------------------
     RESET PERFORMANCE
  --------------------------------------------------- */

  const resetPerformance = () => {

    setNonOptimizedCount(0);

    setOptimizedCount(0);

  };


  /* ===================================================
     RENDER
  =================================================== */

  return (

    <div className="app">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="header">

        <div>

          <div className="badge">
            Experiment 1.4.1 + 1.4.2
          </div>

          <h1>
            Social Media Scheduler
          </h1>

          <p>
            Interactive Calendar &
            Performance Optimization
          </p>

        </div>


        <button
          className="add-post-button"
          onClick={openAddModal}
        >
          + Create Post
        </button>

      </header>


      {/* =================================================
          TOOLBAR
      ================================================= */}

      <section className="toolbar">
        <h2>Week of {formatDate(weekDays[0])}</h2>
        <span className="drag-hint">Drag any post to another day</span>
      </section>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="search-container">

        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

      </div>


      {/* =================================================
          CALENDAR
      ================================================= */}

      <section className="calendar">

        <div className="week-header">
          {weekDays.map((date) => (
            <div key={formatDate(date)}>
              <span>{date.toLocaleDateString("default", { weekday: "short" })}</span>
              <strong>{date.getDate()}</strong>
            </div>
          ))}
        </div>

        <div className="week-view">

            {weekDays.map((date) => (

              <CalendarDay
                key={formatDate(date)}
                date={date}
                posts={
                  filteredPosts
                }
                onEdit={
                  openEditModal
                }
                onDelete={
                  handleDelete
                }
                onDrop={
                  handleDrop
                }
                onDragStart={
                  handleDragStart
                }
                isToday={
                  formatDate(date) ===
                  todayString
                }
              />

            ))}

        </div>

      </section>


      {/* =================================================
          PERFORMANCE SECTION
      ================================================= */}

      <section className="performance">

        <div className="performance-header">

          <div>

            <span className="badge">
              Experiment 1.4.2
            </span>

            <h2>
              ⚡ Rendering Performance
            </h2>

            <p>
              Compare optimized and
              non-optimized rendering
            </p>

          </div>


          <div>

            <div className="performance-actions">
              <label className="mode-toggle">
                <input
                  type="checkbox"
                  checked={nonOptimizedMode}
                  onChange={(event) =>
                    setNonOptimizedMode(event.target.checked)
                  }
                />
                <span className="toggle-track" />
                <span>Non-optimized</span>
              </label>

              <label className="mode-toggle optimized-toggle">
                <input
                  type="checkbox"
                  checked={optimizedMode}
                  onChange={(event) =>
                    setOptimizedMode(event.target.checked)
                  }
                />
                <span className="toggle-track" />
                <span>Optimized</span>
              </label>

              <button
                className="reset-performance"
                onClick={resetPerformance}
              >
                Reset
              </button>
            </div>

          </div>

        </div>


        <div className="performance-cards">

          {/* NON OPTIMIZED */}

          <div className="performance-card red-card">

            <div className="performance-icon">
              ❌
            </div>

            <h3>
              Non-Optimized
            </h3>

            <div className="performance-number">
              {nonOptimizedCount}
            </div>

            <span>
              Work Count
            </span>

            <p>
              Counts update when a post is dragged. The larger count represents
              the work an unoptimized calendar would repeat.
            </p>

          </div>


          {/* OPTIMIZED */}

          <div className="performance-card green-card">

            <div className="performance-icon">
              ✅
            </div>

            <h3>
              Optimized
            </h3>

            <div className="performance-number">
              {optimizedCount}
            </div>

            <span>
              Work Count
            </span>

            <p>
              React.memo, useMemo and useCallback keep the moved-day update small.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        <p>
          React Calendar Scheduler •
          Experiment 1.4.1 & 1.4.2
        </p>

      </footer>


      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>
                {editingPost
                  ? "Edit Post"
                  : "Create New Post"}
              </h2>

              <button
                className="close-button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>


            <form
              onSubmit={savePost}
            >

              {/* TITLE */}

              <label>
                Post Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={
                  handleInputChange
                }
                placeholder="Enter post title"
              />


              {/* PLATFORM */}

              <label>
                Platform
              </label>

              <select
                name="platform"
                value={form.platform}
                onChange={
                  handleInputChange
                }
              >

                <option>
                  Instagram
                </option>

                <option>
                  LinkedIn
                </option>

                <option>
                  Twitter
                </option>

                <option>
                  Facebook
                </option>

              </select>


              {/* DATE */}

              <label>
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={
                  handleInputChange
                }
              />


              {/* TIME */}

              <label>
                Time
              </label>

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={
                  handleInputChange
                }
              />


              {/* ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  {editingPost
                    ? "Update Post"
                    : "Create Post"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default App;