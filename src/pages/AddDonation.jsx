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
    image: null,
    foodType: "",
    packedFood: "",
    madeDate: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data to FormData object
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8081/api/donations/submit", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json", 
        },
        
      });

      if (!response.ok) {
        throw new Error("Failed to submit donation");
      }

      
      setMessage("Donation added successfully!");
      setFormData({
        foodName: "",
        quantity: "",
        expiryDate: "",
        address: "",
        notes: "",
        contact: "",
        image: null,
        foodType: "",
        packedFood: "",
        madeDate: "",
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      setMessage("Error: Could not submit donation.");
    }
  };

  return (
    <div className="donation-container">
      <h1>Add Your Donation</h1>
      <p>Help those in need by sharing your extra food.</p>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Food Name */}
        <label>Food Name:</label>
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          required
        />

        {/* Quantity */}
        <label>Quantity (kg/pieces):</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        {/* Food Type */}
        <label>Is it Perishable or Non-Perishable?</label>
        <select
          name="foodType"
          value={formData.foodType}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Perishable">Perishable</option>
          <option value="Non-Perishable">Non-Perishable</option>
        </select>

        {/* Packed Food */}
        <label>Is it packed food?</label>
        <select
          name="packedFood"
          value={formData.packedFood}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Made Date */}
        <label>When was it made?</label>
        <input
          type="date"
          name="madeDate"
          value={formData.madeDate}
          onChange={handleChange}
          required
        />

        {/* Expiry Date */}
        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />

        {/* Address */}
        <label>Pickup Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        {/* Additional Notes */}
        <label>Additional Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        {/* Contact Information */}
        <label>Contact Information:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <label>Upload Image (Optional):</label>
        <input type="file" onChange={handleFileChange} />

        {/* Submit Button */}
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;
