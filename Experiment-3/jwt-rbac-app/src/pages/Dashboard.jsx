import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, token } = useAuth();

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="welcome-card">
        <h2>
          Welcome, {user?.username}!
        </h2>

        <p>
          You are successfully authenticated.
        </p>

        <div className="info-box">
          <p>
            <strong>Username:</strong>{" "}
            {user?.username}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>

          <p>
            <strong>Authentication:</strong>{" "}
            Successful
          </p>
        </div>
      </div>

      <div className="jwt-card">
        <h2>JWT Information</h2>

        <p>
          <strong>Token:</strong>
        </p>

        <textarea
          value={token || ""}
          readOnly
          rows="5"
        />

        <p className="note">
          This is a mock JWT for frontend
          laboratory demonstration.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;