import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./DonationHistory.css";

const DonationHistory = ({ userEmail }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDonation, setEditingDonation] = useState(null);
  const [editData, setEditData] = useState({});

  const storedEmail = localStorage.getItem("userEmail");
  const emailToUse = userEmail || storedEmail;

  useEffect(() => {
    fetchDonations();
  }, [emailToUse]);

  const fetchDonations = async () => {
    if (!emailToUse) {
      setError("User email is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8081/api/donations/user-email/${emailToUse}`);
      setDonations((prev) => [...prev, ...response.data.filter(d => !prev.some(p => p.id === d.id))]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Failed to fetch donations. Please try again later.");
      setLoading(false);
    }
  };

  const handleEditClick = (donation) => {
    setEditingDonation(donation.id);
    setEditData({ ...donation });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8081/api/donations/${editingDonation}`, editData);
      setDonations((prev) =>
        prev.map((donation) => (donation.id === editingDonation ? { ...donation, ...editData } : donation))
      );
      setEditingDonation(null);
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/donations/${id}`);
      setDonations((prev) => prev.filter((donation) => donation.id !== id));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h2 className="righteous-regulare">Your Donation History</h2> 

      <div className="donation-history-container">
        {donations.length === 0 ? (
          <p className="text-gray-500 text-center">No donations found.</p>
        ) : (
          <ul className="donation-list">
            {donations.map((donation) => (
              <li key={donation.id} className="donation-item">
                <img
                  src={donation.imageUrl || "/placeholder.jpg"}
                  alt={donation.foodName}
                  className="donation-image"
                />
                <div className="donation-details">
                  {editingDonation === donation.id ? (
                    <>
                      <input type="text" name="foodName" value={editData.foodName} onChange={handleEditChange} />
                      <input type="number" name="quantity" value={editData.quantity} onChange={handleEditChange} />
                      <button className="save-button" onClick={handleSaveEdit}>Save</button>
                      <button className="cancel-button" onClick={() => setEditingDonation(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p className="donation-name">{donation.foodName}</p>
                      <p className="donation-info">Quantity: {donation.quantity} kg/pieces</p>
                      <p className="donation-info">Perishable: {donation.isPerishable ? "Yes" : "No"}</p>
                      <p className="donation-info">Packed Food: {donation.isPacked ? "Yes" : "No"}</p>
                      <p className="donation-info">Expiry Date: {donation.expiryDate}</p>
                      <p className="donation-info">Pickup Address: {donation.address}</p>
                      <p className="donation-info"> Item Added On Date: {new Date(donation.madeDate).toLocaleDateString()}</p>
                      <button className="edit-button" onClick={() => handleEditClick(donation)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(donation.id)}>Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

DonationHistory.propTypes = {
  userEmail: PropTypes.string,
};

export default DonationHistory;
