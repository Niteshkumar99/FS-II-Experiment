import React, {
  useEffect,
  useState,
} from "react";

const platforms = [
  "Instagram",
  "YouTube",
  "LinkedIn",
  "X",
  "Facebook",
];

const statuses = [
  "Scheduled",
  "Published",
  "Draft",
];

function PostModal({
  post,
  onSave,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] =
    useState("Instagram");
  const [status, setStatus] =
    useState("Scheduled");
  const [date, setDate] =
    useState("2026-09-01");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setPlatform(post.platform);
      setStatus(post.status);
      setDate(post.date);
    } else {
      setTitle("");
      setPlatform("Instagram");
      setStatus("Scheduled");
      setDate("2026-09-01");
    }
  }, [post]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      id: post?.id,
      title: title.trim(),
      platform,
      status,
      date,
    });
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-top">
          <div>
            <div className="eyebrow">
              CONTENT
            </div>

            <h2>
              {post
                ? "Edit Post"
                : "Create Post"}
            </h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Post title

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter your post title..."
            />
          </label>

          <label>
            Platform

            <select
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
            >
              {platforms.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              {statuses.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date

            <select
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
            >
              {Array.from(
                { length: 30 },
                (_, index) => {
                  const day = index + 1;

                  const value =
                    `2026-09-${String(
                      day
                    ).padStart(2, "0")}`;

                  return (
                    <option
                      key={value}
                      value={value}
                    >
                      September {day}
                    </option>
                  );
                }
              )}
            </select>
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {post
                ? "Save Changes"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostModal;