import React, { useState } from "react";
import "./ReceivedHistory.css";

const ReceivedHistory = () => {
  // Dummy received donations (Replace with API data)
  const [receivedDonations, setReceivedDonations] = useState([
    {
      id: 1,
      donorName: "Anjali Mehta",
      foodItem: "Vegetable Curry & Rice",
      quantity: "4 kg",
      receivedDate: "March 30, 2025",
    },
    {
      id: 2,
      donorName: "Rohit Sharma",
      foodItem: "Milk & Bread",
      quantity: "2 packs",
      receivedDate: "March 28, 2025",
    },
    {
      id: 3,
      donorName: "Deepak Verma",
      foodItem: "Pulses & Flour",
      quantity: "3 kg",
      receivedDate: "March 25, 2025",
    },
  ]);

  return (
    <div className="received-history-container">
      <h2>Received Donations History</h2>
      <p className="info-text">Here are the food items you have received.</p>

      {receivedDonations.length === 0 ? (
        <p className="no-donations">You haven't received any donations yet.</p>
      ) : (
        <ul className="donation-list">
          {receivedDonations.map((donation) => (
            <li key={donation.id} className="donation-item">
              <p>
                <strong>Hello {donation.donorName},</strong> thank you for donating{" "}
                <strong>{donation.foodItem}</strong> ({donation.quantity}) on{" "}
                {donation.receivedDate}.
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReceivedHistory;
