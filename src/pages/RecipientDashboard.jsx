// RecipientDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipientDashboard.css";

const RecipientDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome, Recipient!</h1>
      <div className="dashboard-links">
        <button onClick={() => handleNavigate("/request-food")} className="dashboard-btn">
          Request Food
        </button>
        <button onClick={() => handleNavigate("/received-history")} className="dashboard-btn">
          Received History
        </button>
        <button onClick={() => handleNavigate("/notifications")} className="dashboard-btn">
          Notifications
        </button>
        <button onClick={() => handleNavigate("/profile")} className="dashboard-btn">
          Profile Settings
        </button>
        <button onClick={() => handleNavigate("/logout")} className="dashboard-btn logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default RecipientDashboard;
