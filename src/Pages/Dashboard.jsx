// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./universalpage.css";


const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if (!token) {
      navigate("/login");
    } else {
      setName(storedName);
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-section">
        <div className="dash-info">
          <p>Welcome, {name}</p>
        </div>
        <div className="main-dash">
          <h3>Actions</h3>
          <ul>
            <li>
              <Link to="/jobs-post">🔹 Post New Internship/Jobs</Link>
            </li>
            <li>
              <Link to="/all-jobs">🔹 Manage and View all Jobs / Internship Listings</Link>
            </li>
          </ul>
        </div>
        <div className="logout-btn">
        <button className="admin-dashboard-logout-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
