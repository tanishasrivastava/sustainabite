import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaHistory, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./RecipientDashboard.css";

const RecipientDashboard = () => {
  const navigate = useNavigate();
  const recipientName = localStorage.getItem("userName") || "Recipient";

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <FaUser className="profile-icon" />
        <h1 className="dashboard-heading">Welcome, {recipientName}!</h1>
      </div>
      <div className="dashboard-links">
        <button onClick={() => handleNavigate("/request-food")} className="dashboard-btn">
          <FaUtensils className="btn-icon" /> Request Food
        </button>
        <button onClick={() => handleNavigate("/received-history")} className="dashboard-btn">
          <FaHistory className="btn-icon" /> Received History
        </button>
        <button onClick={() => handleNavigate("/profile")} className="dashboard-btn">
          <FaUser className="btn-icon" /> Profile
        </button>
        <button onClick={handleLogout} className="dashboard-btn logout">
          <FaSignOutAlt className="btn-icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default RecipientDashboard;
