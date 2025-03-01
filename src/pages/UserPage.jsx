import React, { useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import PhoneOTP from "../components/PhoneOTP";
import "./UserPage.css";

const UserPage = () => {
  const [userType, setUserType] = useState(""); // "donor" or "recipient"
  const [authType, setAuthType] = useState(""); // "google" or "phone"

  return (
    <div className="user-page-container">
      <h1 className="righteous-regular">Welcome To SustainaBITE!</h1>

      {/* Interactive Container */}
      <div className="interactive-container">
        {!userType ? (
          // Step 1: Select User Type
          <div className="step-container">
            <p>Choose how you'd like to proceed:</p>
            <h2>Are you a:</h2>
            <div className="options">
              <button
                className={`option-button ${userType === "donor" ? "active" : ""}`}
                onClick={() => setUserType("donor")}
              >
                Donor
              </button>
              <button
                className={`option-button ${userType === "recipient" ? "active" : ""}`}
                onClick={() => setUserType("recipient")}
              >
                Recipient
              </button>
            </div>
          </div>
        ) : !authType ? (
          // Step 2: Select Authentication Method
          <div className="step-container">
            <h2>How would you like to log in or sign up?</h2>
            <div className="options">
              <button
                className={`option-button ${authType === "google" ? "active" : ""}`}
                onClick={() => setAuthType("google")}
              >
                Google
              </button>
              <button
                className={`option-button ${authType === "phone" ? "active" : ""}`}
                onClick={() => setAuthType("phone")}
              >
                Phone OTP
              </button>
            </div>
          </div>
        ) : (
          // Step 3: Show Authentication Component
          <div className="auth-component">
            {authType === "google" ? (
              <GoogleAuth userType={userType} />
            ) : (
              <PhoneOTP userType={userType} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
