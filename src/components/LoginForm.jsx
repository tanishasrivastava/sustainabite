import React, { useState } from "react";
import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ userType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8081/api/auth/login/${userType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Raw Response from Server:", text);

      if (!text.trim()) {
        setError("Empty response from server.");
        setLoading(false);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        setError("Unexpected response format. Server did not return JSON.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Ensure correct userType is logged in
      if (data.userType !== userType) {
        setError("Unauthorized: Incorrect user type.");
        setLoading(false);
        return;
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "User");
      localStorage.setItem("userType", userType);
      localStorage.setItem("userEmail", formData.email); 

      alert("Login successful!");

      
      navigate(userType === "donor" ? "/donor-dashboard" : "/recipient-dashboard");
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="signin-heading">Sign in to your account</h2>
      <form onSubmit={handleSubmit}>
        <label>Your email</label>
        <input
          type="email"
          name="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <div className="form-options">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="para">
        Don’t have an account yet?{" "}
        <a href="#" onClick={(e) => e.preventDefault()}>Sign up</a>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  userType: PropTypes.string.isRequired, 
};

export default LoginForm;
