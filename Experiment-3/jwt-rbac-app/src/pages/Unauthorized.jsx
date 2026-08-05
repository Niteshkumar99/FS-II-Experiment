import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <div className="unauthorized-card">
        <h1>403</h1>

        <h2>Access Denied</h2>

        <p>
          You do not have permission to access
          this resource.
        </p>

        <Link
          to="/dashboard"
          className="back-btn"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;