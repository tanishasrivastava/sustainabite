import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    console.log(formData)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("+++++++++++++++++")
    console.log(formData)
    console.log("+++++++++++++++++")

    try {
      const response = await fetch("http://localhost:8081/api/feedbacks/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      await response.json();
      setMessage("Thank you for your valuable feedback! Your feedback has been received.");
      setFormData({ name: "", email: "", feedback: "", rating: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Error: Could not submit feedback. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="modal-content">
        <h2>FEEDBACK FORM</h2>
        <p>We value your opinion. Share your thoughts and help us improve!</p>
        
        {message && <p className="message">{message}</p>} 
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="icon" />
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <FaEnvelope className="icon" />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <FaComment className="icon" />
            <textarea name="feedback" placeholder="Your Detailed Feedback" value={formData.feedback} onChange={handleChange} required></textarea>
          </div>

          <div className="rating">
            <h2>Rate Our Service:</h2>
            <select name="rating" value={formData.rating} onChange={handleChange} required>
              <option value="">Select a rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
