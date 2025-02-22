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
import PhoneOTP from "./components/PhoneOTP"
import OTPVerification from "./components/OTPVerification";
import Feedback from "./pages/Feedback";   
import VolunteerRegistration from "./pages/VolunteerRegistration"; 
import AddDonation from "./pages/AddDonation";
import CommunityFunding from "./pages/CommunityFunding"; // Adjust the path if needed

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate the loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <Router>
      <div className="app-container">
        {loading ? (
          <Loader /> // Show loader during the loading state
        ) : (
          <div className="main-layout">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/user" element={<UserPage />} />
                <Route path="/" element={<PhoneOTP />} />
                <Route path="/otp-verification" element={<OTPVerification />} />
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/add-donation" element={<AddDonation />} />
                <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
                <Route path="/about" element={<About />} /> {/* About page */}
                <Route path="/feedback" element={<Feedback />} /> {/* New Feedback Route */}
                <Route path="/volunteer-registration" element={<VolunteerRegistration />} /> {/* ✅ Add Route */}
                <Route path="/community-funding" element={<CommunityFunding />} />

              
              </Routes>
            
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
