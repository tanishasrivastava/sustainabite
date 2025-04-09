import React, { useState, useEffect } from "react";
import "./DonorProfile.css";

const DonorProfile = () => {
  const [donor, setDonor] = useState({
    name: localStorage.getItem("donorName") || "Donor",
    email: localStorage.getItem("donorEmail") || "donor@example.com",
    contact: localStorage.getItem("donorContact") || "8595612366",
    address: localStorage.getItem("donorAddress") || "ABC-2,Delhi,India",
    profilePic: localStorage.getItem("donorProfilePic") || "https://via.placeholder.com/150"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(donor);

  useEffect(() => {
    localStorage.setItem("donorName", donor.name);
    localStorage.setItem("donorEmail", donor.email);
    localStorage.setItem("donorContact", donor.contact);
    localStorage.setItem("donorAddress", donor.address);
    localStorage.setItem("donorProfilePic", donor.profilePic);
  }, [donor]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = () => {
    setDonor(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={donor.profilePic} alt="Profile" className="profile-pic" />
        {isEditing ? (
          <input type="text" name="profilePic" value={updatedProfile.profilePic} onChange={handleChange} placeholder="Profile Image URL" />
        ) : null}
        <h2>{donor.name}</h2>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>Contact:</strong> {donor.contact}</p>
        <p><strong>Address:</strong> {donor.address}</p>
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

export default DonorProfile;
