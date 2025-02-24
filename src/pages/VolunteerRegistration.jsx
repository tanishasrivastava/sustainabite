import React, { useState } from "react";
import "./VolunteerRegistration.css";

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    location: "",
    hoursPerWeek: "",
    monthsCommitment: "",
    motivation: "",
    skills: "",
    experience: "",
  });

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register volunteer");
      }

      setIsPopupVisible(true);
      setFormData({
        name: "",
        age: "",
        phone: "",
        email: "",
        location: "",
        hoursPerWeek: "",
        monthsCommitment: "",
        motivation: "",
        skills: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error submitting volunteer registration:", error);
    }
  };

  return (
    <div className="volunteer-container">
      <h1 className="volunteer-heading">Volunteer Registration</h1>
<p className="volunteer-description">Join us in making a difference! Fill out the form below.</p>


      <form onSubmit={handleSubmit}>
      <label className="volunteer-label">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label className="volunteer-label">Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label className="volunteer-label">Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label className="volunteer-label">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label className="volunteer-label">Current Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label className="volunteer-label">How many hours can you volunteer per week?</label>
        <select name="hoursPerWeek" value={formData.hoursPerWeek} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="<3">Less than 3 hours</option>
          <option value="3-6">3-6 hours</option>
          <option value="6-9">6-9 hours</option>
          <option value="9+">9 or more hours</option>
        </select>

        <label className="volunteer-label">How many months can you commit to volunteering?</label>
        <select name="monthsCommitment" value={formData.monthsCommitment} onChange={handleChange} required>
          <option value="">Select</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} month(s)</option>
          ))}
        </select>

        <label className="volunteer-label">What skills do you bring to the platform?</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="E.g., Cooking, Logistics, Communication" />

        <label className="volunteer-label">Do you have any prior volunteering experience?</label>
        <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Briefly describe your experience"></textarea>

        <label className="volunteer-label">Why do you want to be a volunteer?</label>
        <textarea name="motivation" value={formData.motivation} onChange={handleChange} required></textarea>

        <button type="submit">Submit</button>
      </form>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>Your volunteer registration has been submitted successfully.</p>
            <button onClick={() => setIsPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerRegistration;
