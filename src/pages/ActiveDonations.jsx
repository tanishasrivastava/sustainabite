import React, { useState } from "react";
import "./ActiveDonations.css";

const ActiveDonations = () => {
  // Dummy active donations (Replace with API data)
  const [activeDonations, setActiveDonations] = useState([
    {
      id: 1,
      recipientName: "Rahul Sharma",
      foodItem: "Rice & Dal",
      quantity: "5 kg",
      requestDate: "March 30, 2025",
      status: "In Progress",
    },
    {
      id: 2,
      recipientName: "Neha Verma",
      foodItem: "Fruits & Vegetables",
      quantity: "3 kg",
      requestDate: "March 29, 2025",
      status: "In Progress",
    },
    {
      id: 3,
      recipientName: "Amit Gupta",
      foodItem: "Bread & Butter",
      quantity: "2 packs",
      requestDate: "March 28, 2025",
      status: "In Progress",
    },
  ]);

  const [popupMessage, setPopupMessage] = useState("");

  const markAsCompleted = (id) => {
    const updatedDonations = activeDonations.filter((donation) => donation.id !== id);
    setActiveDonations(updatedDonations);
    setPopupMessage("Donation marked as Completed ✅");

    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  return (
    <div className="active-donations-container">
      <h2>Active Donations</h2>
      <p className="info-text">Here are the food items you have accepted for donation.</p>

      {popupMessage && <div className="popup">{popupMessage}</div>}

      {activeDonations.length === 0 ? (
        <p className="no-donations">No active donations at the moment.</p>
      ) : (
        <ul className="donation-list">
          {activeDonations.map((donation) => (
            <li key={donation.id} className="donation-item">
              <p>
                <strong>{donation.recipientName}</strong> is receiving{" "}
                <strong>{donation.foodItem}</strong> ({donation.quantity}) on{" "}
                {donation.requestDate}.
              </p>
              <span className="status">{donation.status}</span>
              <button className="complete-btn" onClick={() => markAsCompleted(donation.id)}>
                ✅ Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveDonations;
