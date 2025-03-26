import React, { useState } from "react";
import "./SignupForm.css";
import PropTypes from "prop-types"; 

const SignupForm = ({ userType }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
       `http://localhost:8081/api/auth/signup/${userType}`,// Dynamic API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            password: formData.password,
          }),
        }
      );

      const data = await response.text(); 

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label className="label-text">Your email</label>
      <input
        type="email"
        name="email"
        placeholder="name@company.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label className="label-text">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="e.g. Bonnie Green"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label className="label-text">Password</label>
      <input
        type="password"
        name="password"
        placeholder="********"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <label className="label-text">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="********"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Divider */}
      <div className="divider">
        <span>or</span>
      </div>

      {/* Signup with Google & Phone No. */}
      <button type="button" className="social-signup google">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
        Sign up with Google
      </button>

      <button type="button" className="social-signup phone">
        📱 Sign up with Phone No.
      </button>

      {/* Terms & Conditions */}
      <div className="checkbox-group">
        <input type="checkbox" required />
        <label>
          By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" className="signup-button" disabled={loading}>
        {loading ? "Creating account..." : "Create an account"}
      </button>
    </form>
  );
};
// ✅ Add PropTypes validation
SignupForm.propTypes = {
    userType: PropTypes.string.isRequired, // Ensure userType is passed as a required string prop
  };
  

export default SignupForm;
