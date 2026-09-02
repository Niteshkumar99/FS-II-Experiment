import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";
import Posts from "./pages/Posts";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>

          <Routes>

            {/* LOGIN */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Editor",
                    "Viewer",
                  ]}
                >
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              }
            />

            {/* POSTS */}
            <Route
              path="/posts"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Editor",
                    "Viewer",
                  ]}
                >
                  <>
                    <Navbar />
                    <Posts />
                  </>
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin"]}
                >
                  <>
                    <Navbar />
                    <Admin />
                  </>
                </ProtectedRoute>
              }
            />

            {/* EDITOR */}
            <Route
              path="/editor"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Editor",
                  ]}
                >
                  <>
                    <Navbar />
                    <Editor />
                  </>
                </ProtectedRoute>
              }
            />

            {/* VIEWER */}
            <Route
              path="/viewer"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Editor",
                    "Viewer",
                  ]}
                >
                  <>
                    <Navbar />
                    <Viewer />
                  </>
                </ProtectedRoute>
              }
            />

            {/* UNAUTHORIZED */}
            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />

            {/* DEFAULT */}
            <Route
              path="/"
              element={
                <Navigate
                  to="/login"
                  replace
                />
              }
            />

            {/* INVALID URL */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/login"
                  replace
                />
              }
            />

          </Routes>

        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;