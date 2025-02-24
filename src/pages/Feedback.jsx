import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment, FaStar } from "react-icons/fa";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setShowPopup(true);
      setFormData({ name: "", email: "", message: "", rating: 0 });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container">
      <div className="modal-content">
        <h2>FEEDBACK FORM</h2>
        <p>We value your opinion. Share your thoughts and help us improve!</p>

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
            <textarea name="message" placeholder="Your Detailed Feedback" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          <div className="rating">
            <h2>Rate Our Service:</h2>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`rating__star ${star <= formData.rating ? "selected" : ""}`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Feedback Submitted!</h3>
            <p>Thank you for your valuable feedback.</p>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
