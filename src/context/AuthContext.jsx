import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import axios from "axios";
import jwt_decode from "jwt-decode"; // Install with `npm install jwt-decode`

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if JWT exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token); // Decode token
        setUser({ email: decoded.sub }); // Assuming email is in 'sub' field
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Function to login user and store token
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const token = res.data.token; // Ensure backend sends { token: "jwt_here" }
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      setUser({ email: decoded.sub });
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures `children` is passed
};

export const useAuth = () => useContext(AuthContext);
