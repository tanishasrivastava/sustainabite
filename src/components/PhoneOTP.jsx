import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUpRecaptcha } from "../firebase/firebaseConfig";

const PhoneInput = ({ userType }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      const formattedPhoneNumber = `+91${phoneNumber}`;
      try {
        const confirmationResult = await setUpRecaptcha(formattedPhoneNumber);
        localStorage.setItem("confirmationResult", JSON.stringify(confirmationResult));
        navigate("/otp-verification", { state: { userType } });
      } catch (error) {
        alert("Failed to send OTP. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="phone-input-container">
      <h2>Enter Your Phone Number</h2>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        maxLength="10"
        className="phone-input"
      />
      <div id="recaptcha-container"></div>
      <button onClick={handleSendOtp} className="send-otp-button" disabled={loading}>
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </div>
  );
};

export default PhoneInput;
