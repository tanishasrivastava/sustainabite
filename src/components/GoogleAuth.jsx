import React from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuth = ({ userType }) => {
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    console.log(`Logged in as ${userType} via Google`);
    navigate(userType === "donor" ? "/donor-dashboard" : "/recipient-dashboard");
  };

  return (
    <div>
      <h2>Google Authentication</h2>
      <button onClick={handleGoogleAuth}>Login with Google</button>
    </div>
  );
};

export default GoogleAuth;
