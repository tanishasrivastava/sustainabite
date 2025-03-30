import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm"; // Import login form component
import "./UserPage.css";
import Footer from "../components/Footer"
const UserPage = () => {
  const [userType, setUserType] = useState(""); // "donor" or "recipient"
  const [actionType, setActionType] = useState(""); // "login" or "signup"

  const showSignupForm = actionType === "signup";
  const showLoginForm = actionType === "login";

  return (
    <div className="user-page-container">
      <h1 className="righteous-regularm">Welcome To SustainaBITE!</h1>

      {/* Show only SignupForm or LoginForm, hiding other elements */}
      {showSignupForm && <SignupForm userType={userType} />}
      {showLoginForm && <LoginForm userType={userType} />}

      {/* Hide interactive container when login/signup is visible */}
      {!showSignupForm && !showLoginForm && (
        <div className="interactive-container">
          {!userType ? (
            <div className="step-container">
              <p className="head">Choose how you'd like to proceed:</p>
              <h2 className="head">YOUR ROLE ?</h2>
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
          ) : (
            <div className="step-container">
              <h2 className="head">Would you like to:</h2>
              <div className="options">
                <button
                  className={`option-button ${actionType === "login" ? "active" : ""}`}
                  onClick={() => setActionType("login")}
                >
                  Login
                </button>
                <button
                  className={`option-button ${actionType === "signup" ? "active" : ""}`}
                  onClick={() => setActionType("signup")}
                >
                  Signup
                </button>
              </div>
            </div>
          )}

          {/* Add Footer Here */}
      <Footer />
        </div>
      )}
    </div>
  );
};

export default UserPage;
