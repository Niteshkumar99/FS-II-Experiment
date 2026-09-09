import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Mock users
const USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  {
    username: "editor",
    password: "editor123",
    role: "Editor",
  },
  {
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
  },
];

// Create a mock JWT
const createMockJWT = (user) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    username: user.username,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));

  // Mock signature for frontend demonstration
  const signature = btoa(
    `${base64Header}.${base64Payload}.experiment3`
  );

  return `${base64Header}.${base64Payload}.${signature}`;
};

// Decode JWT
const decodeJWT = (token) => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));

    return payload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check token when application starts
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      const decodedUser = decodeJWT(storedToken);

      if (decodedUser) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedUser.exp > currentTime) {
          setToken(storedToken);
          setUser(decodedUser);
        } else {
          localStorage.removeItem("jwtToken");
        }
      }
    }
  }, []);

  // Login function
  const login = (username, password) => {
    const foundUser = USERS.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const newToken = createMockJWT(foundUser);

    localStorage.setItem("jwtToken", newToken);

    setToken(newToken);

    const decodedUser = decodeJWT(newToken);
    setUser(decodedUser);

    return {
      success: true,
      user: decodedUser,
    };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("jwtToken");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};