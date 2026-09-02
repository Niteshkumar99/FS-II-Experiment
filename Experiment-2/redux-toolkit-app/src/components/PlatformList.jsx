import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePlatform,
  editPlatform,
} from "../features/platformSlice";

function PlatformList() {
  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const startEdit = (platform) => {
    setEditingId(platform.id);
    setNewName(platform.name);
  };

  const saveEdit = () => {
    dispatch(
      editPlatform({
        id: editingId,
        name: newName,
      })
    );

    setEditingId(null);
    setNewName("");
  };

  return (
    <div className="card">
      <h2>Platforms</h2>

      {platforms.length === 0 && (
        <p>No Platforms Added</p>
      )}

      {platforms.map((platform) => (
        <div className="list-item" key={platform.id}>
          {editingId === platform.id ? (
            <>
              <input
                value={newName}
                onChange={(e) =>
                  setNewName(e.target.value)
                }
              />

              <button
                className="save-btn"
                onClick={saveEdit}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>{platform.name}</span>

              <div>
                <button
                  className="edit-btn"
                  onClick={() =>
                    startEdit(platform)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(
                      deletePlatform(platform.id)
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlatformList;