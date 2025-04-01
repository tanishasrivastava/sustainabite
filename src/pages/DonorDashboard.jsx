import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [mealsSaved, setMealsSaved] = useState(0);

  // Retrieve donor name from localStorage
  const donorName = localStorage.getItem("userName") || "Donor";
  const donorId = "user123"; // Replace with actual donor ID from auth context

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/donations/count?donorId=${donorId}`);

        setTotalDonations(response.data.totalDonations);
        setMealsSaved(response.data.mealsSaved);
      } catch (error) {
        console.error("Error fetching donation stats", error);
      }
    };

    fetchDonationStats();
  }, [donorId]);

  return (
    <div className="donor-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {donorName}!</h1>
        <p>Your contributions are making a difference!</p>
      </header>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Donations</h3>
          <p>{totalDonations}</p>
        </div>
        <div className="metric-card">
          <h3>Meals Saved</h3>
          <p>{mealsSaved}</p>
        </div>
        <div className="metric-card">
          <h3>Environmental Impact</h3>
          <p>{totalDonations * 1} kg CO₂ saved</p>
        </div>
      </div>

      <div className="dashboard-linkks">
        <Link to="/add-donation" className="dashboard-link">Add Donation</Link>
        <Link to="/donation-history" className="dashboard-link">Donation History</Link>
        <Link to="/active-donations" className="dashboard-link">Active Donations</Link>
        <Link to="/donor-notifications" className="dashboard-link">Notifications</Link>
        <Link to="/donor-profile" className="dashboard-link">Profile</Link>
      
        <Link to="/" className="dashboard-link logout" onClick={() => localStorage.clear()}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default DonorDashboard;
