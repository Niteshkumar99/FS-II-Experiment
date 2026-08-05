import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        JWT + RBAC
      </div>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/posts">
          Posts
        </Link>

        {user?.role === "Admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

        {(user?.role === "Admin" ||
          user?.role === "Editor") && (
          <Link to="/editor">
            Editor
          </Link>
        )}

        <Link to="/viewer">
          Viewer
        </Link>

      </div>

      <div className="user-section">

        <span>
          {user?.username}
          {" "}
          ({user?.role})
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;