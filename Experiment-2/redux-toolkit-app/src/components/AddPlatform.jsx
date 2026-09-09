import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlatform } from "../features/platformSlice";

function AddPlatform() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (name.trim() === "") {
      alert("Please enter platform name!");
      return;
    }

    dispatch(
      addPlatform({
        id: Date.now(),
        name,
      })
    );

    setName("");
  };

  return (
    <div className="card">
      <h2>Add Platform</h2>

      <input
        type="text"
        placeholder="Platform Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="add-btn" onClick={handleAdd}>
        Add Platform
      </button>
    </div>
  );
}

export default AddPlatform;