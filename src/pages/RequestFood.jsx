import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestFood.css";

const RequestFood = () => {
  const [donations, setDonations] = useState([]);
  const [sortOption, setSortOption] = useState("expiry");


  // Fetch donations from backend
  useEffect(() => {
    axios.get("http://localhost:8081/api/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  // Handle sorting
  const sortedDonations = [...donations].sort((a, b) => {
    switch (sortOption) {
      case "expiry":
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      case "quantity":
        return b.quantity - a.quantity;
      case "perishable":
        return a.perishable === "Yes" ? -1 : 1;
      case "nonPerishable":
        return a.perishable === "No" ? -1 : 1;
      default:
        return 0;
    }
  });

  // Handle food request
  const handleRequest = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:8081/api/request-food", {
        foodId,
        quantity: 1,  // Default quantity (can be dynamic later)
      });

      if (response.status === 200) {
        alert("Request Sent Successfully!");
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Error requesting food:", error);
      alert("Error sending request.");
    }
  };

  return (
    <div className="request-food-container">
      <h1>Available Food Donations</h1>

      {/* Sorting Dropdown */}
      <div className="sorting-options">
        <label>Sort By:</label>
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="expiry">Expiry Date</option>
          <option value="quantity">Quantity</option>
          <option value="perishable">Perishable</option>
          <option value="nonPerishable">Non-Perishable</option>
        </select>
      </div>

      {/* Food List */}
      <div className="food-list">
        {sortedDonations.length > 0 ? (
          sortedDonations.map((food) => (
            <div key={food._id} className="food-card">
              <img src={food.imageUrl || "default-food.jpg"} alt={food.foodName} />
              <div className="food-details">
                <h2>{food.foodName}</h2>
                <p><strong>Expiry:</strong> {food.expiryDate}</p>
                <p><strong>Quantity:</strong> {food.quantity} {food.unit}</p>
                <p><strong>Type:</strong> {food.perishable === "Yes" ? "Perishable" : "Non-Perishable"}</p>
                <button onClick={() => handleRequest(food._id)}>Request Food</button>
              </div>
            </div>
          ))
        ) : (
          <p>No donations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RequestFood;
