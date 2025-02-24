import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestFood.css";

const RequestFood = () => {
  const [donations, setDonations] = useState([]);
  const [sortOption, setSortOption] = useState("expiry");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8081/donations").then((res) => {
      setDonations(res.data);
    });
  }, []);

  const handleRequest = async (foodId) => {
    await axios.post("http://localhost:8081/request-food", { foodId, quantity: 1 });
    alert("Request Sent!");
  };

  return (
    <div className="request-food-container">
      <h1>Available Food Donations</h1>

      <div className="sorting-options">
        <label>Sort By:</label>
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="expiry">Expiry Date</option>
          <option value="quantity">Quantity</option>
          <option value="perishable">Perishable</option>
          <option value="nonPerishable">Non-Perishable</option>
        </select>
      </div>

      <div className="food-list">
        {donations.map((food) => (
          <div key={food._id} className="food-card">
            <img src={food.imageUrl} alt={food.name} />
            <div className="food-details">
              <h2>{food.name}</h2>
              <p>Expiry: {food.expiryDate}</p>
              <p>Quantity: {food.quantity} {food.unit}</p>
              <p>{food.perishable ? "Perishable" : "Non-Perishable"}</p>
              <button onClick={() => handleRequest(food._id)}>Request</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestFood;
