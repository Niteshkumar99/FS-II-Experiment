import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Editor = () => {
  const { user } = useAuth();

  return (
    <div className="page">

      <h1>Editor Panel</h1>

      <div className="role-card">

        <h2>
          Welcome, {user?.username}
        </h2>

        <p>
          You have editor permissions.
        </p>

        <div className="permissions">

          <h3>
            Editor Permissions
          </h3>

          <ul>
            <li>✓ View Posts</li>
            <li>✓ Create Posts</li>
            <li>✓ Update Posts</li>
            <li>✗ Delete Posts</li>
          </ul>

        </div>

        <Link
          to="/posts"
          className="action-link"
        >
          Create / Update Posts
        </Link>

      </div>

    </div>
  );
};

export default Editor;