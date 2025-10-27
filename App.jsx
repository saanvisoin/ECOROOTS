// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
import Shop from "./components/Shop";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("loggedInUser")
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/shop"
          element={
            isAuthenticated ? <Shop /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}
