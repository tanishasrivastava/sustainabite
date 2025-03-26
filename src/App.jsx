import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About"; 
import Home from "./pages/Home"; 
import UserPage from "./pages/UserPage";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import PhoneOTP from "./components/PhoneOTP";
import OTPVerification from "./components/OTPVerification";
import Feedback from "./pages/Feedback";   
import VolunteerRegistration from "./pages/VolunteerRegistration"; 
import AddDonation from "./pages/AddDonation";
import CommunityFunding from "./pages/CommunityFunding"; 
import RequestFood from "./pages/RequestFood"; 
import DonationHistory from "./pages/DonationHistory";
import RecipientProfile from "./pages/RecipientProfile";
import DonorProfile from "./pages/DonorProfile";
import DonorNotifications from "./pages/DonorNotifications"; 

const App = () => {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null); 

  useEffect(() => {
    // ✅ Retrieve email from localStorage (if stored after login)
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    // Simulate the loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {loading ? (
          <Loader />
        ) : (
          <div className="main-layout">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/phone-otp" element={<PhoneOTP />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/donation-history" element={<DonationHistory userEmail={userEmail} />} /> {/* ✅ Pass userEmail */}
                <Route path="/add-donation" element={<AddDonation />} />
                <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
                <Route path="/profile" element={<RecipientProfile />} /> {/* ✅ New Route */}
                <Route path="/donor-profile" element={<DonorProfile />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/volunteer-registration" element={<VolunteerRegistration />} />
                <Route path="/community-funding" element={<CommunityFunding />} />
                <Route path="/request-food" element={<RequestFood />} />
                <Route path="/donor-notifications" element={<DonorNotifications />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
