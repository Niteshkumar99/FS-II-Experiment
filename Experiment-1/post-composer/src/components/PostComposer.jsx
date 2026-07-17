import { useEffect, useState } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";

const platformLimits = {
  LinkedIn: 3000,
  Twitter: 280,
  Instagram: 2200,
};

export default function PostComposer() {
  const [platform, setPlatform] = useState("LinkedIn");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState([]);

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(savedDrafts);
  }, []);

  // Validate content whenever platform or content changes
  useEffect(() => {
    validatePost();
  }, [platform, content]);

  function validatePost() {
    if (content.length > platformLimits[platform]) {
      setError(
        `Maximum ${platformLimits[platform]} characters allowed for ${platform}`
      );
    } else {
      setError("");
    }
  }

  // Save Draft
  function saveDraft() {
    if (!content.trim()) {
      alert("Please write something before saving.");
      return;
    }

    const newDraft = {
      id: Date.now(),
      platform,
      content,
      date: new Date().toLocaleString(),
    };

    const updatedDrafts = [...drafts, newDraft];

    setDrafts(updatedDrafts);
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts));

    alert("Draft Saved Successfully!");

    // Clear editor
    setContent("");
  }

  // Delete Draft
  function deleteDraft(id) {
    const updatedDrafts = drafts.filter((draft) => draft.id !== id);

    setDrafts(updatedDrafts);
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts));
  }

  // Publish Post
  function publishPost() {
    if (!content.trim()) {
      alert("Please write a post.");
      return;
    }

    if (error) {
      alert(error);
      return;
    }

    alert("🎉 Post Published Successfully!");

    setContent("");
  }

  return (
    <div className="container">
      <h1> Post Composer</h1>

      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <textarea
        rows="8"
        placeholder="Write your post here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <CharacterCounter
        current={content.length}
        limit={platformLimits[platform]}
      />

      {error && <p className="error">{error}</p>}

      <div className="buttons">
        <button onClick={saveDraft}>💾 Save Draft</button>

        <button onClick={publishPost} disabled={!!error}>
           Publish
        </button>
      </div>

      <hr />

      <h2>📂 Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p>No drafts available.</p>
      ) : (
        <div className="draft-list">
          {drafts.map((draft) => (
            <div className="draft-card" key={draft.id}>
              <h3>{draft.platform}</h3>

              <small>{draft.date}</small>

              <p>{draft.content}</p>

              <div className="draft-buttons">
                <button onClick={() => deleteDraft(draft.id)}>
                  🗑 Delete Draft
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}