import React, { useState, useEffect } from "react";
import "./RecipientProfile.css";

const RecipientProfile = () => {
  const [recipient, setRecipient] = useState({
    name: localStorage.getItem("userName") || "Recipient",
    email: localStorage.getItem("userEmail") || "recipient@example.com",
    contact: localStorage.getItem("userContact") || "Not Provided",
    address: localStorage.getItem("userAddress") || "Not Provided",
    profilePic: localStorage.getItem("profilePic") || "https://via.placeholder.com/150"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(recipient);

  useEffect(() => {
    localStorage.setItem("userName", recipient.name);
    localStorage.setItem("userEmail", recipient.email);
    localStorage.setItem("userContact", recipient.contact);
    localStorage.setItem("userAddress", recipient.address);
    localStorage.setItem("profilePic", recipient.profilePic);
  }, [recipient]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = () => {
    setRecipient(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={recipient.profilePic} alt="Profile" className="profile-pic" />
        {isEditing ? (
          <input type="text" name="profilePic" value={updatedProfile.profilePic} onChange={handleChange} placeholder="Profile Image URL" />
        ) : null}
        <h2>{recipient.name}</h2>
        <p><strong>Email:</strong> {recipient.email}</p>
        <p><strong>Contact:</strong> {recipient.contact}</p>
        <p><strong>Address:</strong> {recipient.address}</p>
        {isEditing ? (
          <>
            <input type="text" name="name" value={updatedProfile.name} onChange={handleChange} />
            <input type="email" name="email" value={updatedProfile.email} onChange={handleChange} />
            <input type="text" name="contact" value={updatedProfile.contact} onChange={handleChange} />
            <input type="text" name="address" value={updatedProfile.address} onChange={handleChange} />
            <button onClick={handleSave} className="save-btn">Save Changes</button>
          </>
        ) : (
          <button onClick={handleEditClick} className="edit-btn">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default RecipientProfile;
