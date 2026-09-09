import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Viewer = () => {
  const { user } = useAuth();

  return (
    <div className="page">

      <h1>Viewer Panel</h1>

      <div className="role-card">

        <h2>
          Welcome, {user?.username}
        </h2>

        <p>
          You have read-only access.
        </p>

        <div className="permissions">

          <h3>
            Viewer Permissions
          </h3>

          <ul>
            <li>✓ View Posts</li>
            <li>✗ Create Posts</li>
            <li>✗ Update Posts</li>
            <li>✗ Delete Posts</li>
          </ul>

        </div>

        <Link
          to="/posts"
          className="action-link"
        >
          View Posts
        </Link>

      </div>

    </div>
  );
};

export default Viewer;