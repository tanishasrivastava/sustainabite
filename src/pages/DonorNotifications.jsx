import React, { useState } from "react";
import "./DonorNotifications.css";

const DonorNotifications = () => {
  // Dummy food requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      recipientName: "Rahul Sharma",
      foodItem: "Rice & Dal",
      quantity: "5 kg",
      requestDate: "March 30, 2025",
    },
    {
      id: 2,
      recipientName: "Neha Verma",
      foodItem: "Fruits & Vegetables",
      quantity: "3 kg",
      requestDate: "March 29, 2025",
    },
    {
      id: 3,
      recipientName: "Amit Gupta",
      foodItem: "Bread & Butter",
      quantity: "2 packs",
      requestDate: "March 28, 2025",
    },
  ]);

  const [popupMessage, setPopupMessage] = useState("");

  const handleAcceptRequest = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    setRequests(updatedRequests);
    setPopupMessage("User request accepted for food item ✅");

    setTimeout(() => {
      setPopupMessage("");
    }, 2000);
  };

  const handleRejectRequest = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    setRequests(updatedRequests);
  };

  return (
    <div className="notifications-container">
      <h2>Donor Notifications</h2>
      <p className="info-text">Here are the food requests made by recipients.</p>

      {popupMessage && <div className="popup">{popupMessage}</div>}

      {requests.length === 0 ? (
        <p className="no-requests">No new requests at the moment.</p>
      ) : (
        <ul className="request-list">
          {requests.map((request) => (
            <li key={request.id} className="request-item">
              <p>
                <strong>{request.recipientName}</strong> requested for{" "}
                <strong>{request.foodItem}</strong> ({request.quantity}) on{" "}
                {request.requestDate}.
              </p>
              <div className="button-group">
                <button className="accept-btn" onClick={() => handleAcceptRequest(request.id)}>
                  ✅ Accept Request
                </button>
                <button className="reject-btn" onClick={() => handleRejectRequest(request.id)}>
                  ❌ Reject Request
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonorNotifications;
