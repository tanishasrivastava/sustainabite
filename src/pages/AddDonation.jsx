import React, { useState } from "react";
import "./AddDonation.css";

const AddDonation = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    address: "",
    notes: "",
    contact: "",
    email: "", // Added email field
    image: null,
    foodType: "",
    packedFood: "",
    madeDate: "",
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8081/api/donations/submit", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit donation");
      }

      setIsPopupVisible(true);
      setFormData({
        foodName: "",
        quantity: "",
        expiryDate: "",
        address: "",
        notes: "",
        contact: "",
        email: "", // Reset email field
        image: null,
        foodType: "",
        packedFood: "",
        madeDate: "",
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  return (
    <div className="donation-container">
      <h1>Add Your Donation</h1>
      <p>Help those in need by sharing your extra food.</p>

      <form onSubmit={handleSubmit}>
        <label>Food Name:</label>
        <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} required />

        <label>Quantity (kg/pieces):</label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />

        <label>Is it Perishable or Non-Perishable?</label>
        <select name="foodType" value={formData.foodType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Perishable">Perishable</option>
          <option value="Non-Perishable">Non-Perishable</option>
        </select>

        <label>Is it packed food?</label>
        <select name="packedFood" value={formData.packedFood} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>When was it made?</label>
        <input type="date" name="madeDate" value={formData.madeDate} onChange={handleChange} required />

        <label>Expiry Date:</label>
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />

        <label>Pickup Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

        <label>Additional Notes:</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>

        <label>Contact Information:</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Upload Image (Optional):</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Submit Donation</button>
      </form>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>Your donation has been added successfully.</p>
            <button onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDonation;
