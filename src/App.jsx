import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import BlogDetails from "./components/BlogDetails";

function ProtectedRoute({ isLoggedIn, children }) {
  // Send guests to sign in before showing protected pages.
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="container py-4">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BlogList onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-blog"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BlogDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
