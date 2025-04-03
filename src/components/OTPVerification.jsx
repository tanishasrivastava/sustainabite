import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig"; 
import "./OTPVerification.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationResult = JSON.parse(localStorage.getItem("confirmationResult")); 

  const handleChange = (element, index) => {
    const value = element.value;
    const newOtp = [...otp];

    if (/^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

     
      if (index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "") {
      
      newOtp[index] = "";
      setOtp(newOtp);

      
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    try {
      if (confirmationResult) {
        
        await confirmationResult.confirm(enteredOtp);
        alert("OTP Verified Successfully!");

       
        const userType = location.state?.userType;
        if (userType === "recipient") {
          navigate("/recipient-dashboard");
        } else if (userType === "donor") {
          navigate("/donor-dashboard");
        }
      } else {
        throw new Error("Invalid OTP verification setup. Please retry.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP! Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Verify Your Account</h2>
      <p className="subheading">
        An OTP has been sent to your phone number.
        <br />
        Enter the verification code below:
      </p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="code-container">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              className="code"
              id={`otp-input-${index}`}
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
