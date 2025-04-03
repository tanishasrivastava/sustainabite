import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PhoneInput.css";

const PhoneInput = ({ userType }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      const otp = Math.floor(100000 + Math.random() * 900000); 
      localStorage.setItem("otp", otp); 
      alert(`OTP sent to ${phoneNumber}: ${otp}`); 
      navigate("/verify-otp", { state: { userType, phoneNumber } });
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="phone-input-container">
      <h2>Enter Your Phone Number</h2>
      {/* Input field for entering the phone number */}
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        maxLength="10"
        className="phone-input"
      />
      {/* Button to send OTP */}
      <button className="send-otp-button" onClick={handleSendOtp}>
        Send OTP
      </button>
    </div>
  );
};

export default PhoneInput;
