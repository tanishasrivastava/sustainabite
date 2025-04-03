import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";


 

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
      
        <div className="hero-text">
          <h1>About <span className="highlight">SustainaBite</span></h1>
          <p>Connecting food donors with those in need, reducing food waste, and making an impact.</p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="mission-section">
        <h2>🌍 Our Mission</h2>
        <p>
          SustainaBite is committed to minimizing food waste and ensuring surplus food reaches
          the ones who need it most. Our platform enables restaurants, grocery stores, and individuals
          to donate excess food efficiently.
        </p>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <h2 className="about1">🔄 How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>📌 Donors</h3>
            <p>Restaurants, stores, and individuals can list surplus food on the platform.</p>
          </div>
          <div className="step">
            <h3>⚙️ SustainaBite System</h3>
            <p>Our system matches donations with nearby NGOs and recipients.</p>
          </div>
          <div className="step">
            <h3>📩 Real-Time Alerts</h3>
            <p>NGOs & recipients receive instant pickup notifications.</p>
          </div>
          <div className="step">
            <h3>📦 NGOs & Recipients</h3>
            <p>They verify, collect, and distribute food to those in need.</p>
          </div>
          <div className="step">
            <h3>📊 Impact Tracking</h3>
            <p>We track food saved, people fed, and environmental impact.</p>
          </div>
        </div>
      </section>

      {/* How to Become a Donor or Recipient */}
      <section className="get-involved">
        <h2>🤝 How to Get Involved</h2>
        <div className="role-container">
          <div className="role">
            <h3>🛒 Become a Donor</h3>
            <p>Have surplus food? List it on SustainaBite and help reduce the waste!</p>
            <ul>
              <li>📋 Register as a donor</li>
              <li>📍 Add food donation details</li>
              <li>🔔 Get matched with a nearby NGO/recipient</li>
              <li>🚚 Food gets picked up & distributed</li>
            </ul>
          </div>
          <div className="role">
            <h3>🍽️ Become a Recipient</h3>
            <p>Need food for your NGO or community? Sign up & request donations.</p>
            <ul>
              <li>🔹 Register as a recipient</li>
              <li>🔹 Browse available food donations</li>
              <li>🔹 Request food & confirm pickup</li>
              <li>🔹 Distribute to those in need</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="locations">
        <h2>📍 Our Store Locations</h2>
        <p>
          We currently operate in Delhi, Mumbai, Bangalore, Hyderabad, and Pune, with
          more cities coming soon!
        </p>
        <ul>
          <li>🏬 Delhi - Connaught Place | 9 AM - 10 PM</li>
          <li>🏬 Mumbai - Bandra | 8 AM - 9 PM</li>
          <li>🏬 Bangalore - MG Road | 10 AM - 10 PM</li>
          <li>🏬 Hyderabad - Banjara Hills | 9 AM - 9 PM</li>
          <li>🏬 Pune - Koregaon Park | 8 AM - 8 PM</li>
        </ul>
      </section>

      {/* Community Funding */}
      <section className="community-funding">
        <h2>💰 Community Funding</h2>
        <p>
          Support us through PhonePe API- powered donations! Your contributions help us
          expand operations and feed more people.
        </p>
      </section>

      {/* Join Us */}
      <section className="join-us">
        <h2>🚀 Join Us in Making a Difference!</h2>
        <p>Sign up today and be a part of the Food Rescue Movement.</p>
        <button className="cta-button" onClick={() => navigate("/user")}>
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
